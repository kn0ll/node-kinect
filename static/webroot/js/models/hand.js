$(function() {
    
    window.Hand = Backbone.Model.extend({
        
        id: null,
        
        view: null,
        
        defaults: {
            x: 0,
            y: 0,
            z: 0
        },
        
        initialize: function() {
            
            var self = this,
                defaults = self.defaults,
                id = self.id;
            
            this.view = new HandView(this);
            
            Socket.on('message', function(d) {
                parse_message.call(self, d, defaults, id);
            });
            
        }
      
    });
    
    function parse_message(d, defaults, id) {
        
            // json parsed obj from socket
        var osc = $.parseJSON(d),
            // left_x, right_z, etc.
            hand_map = osc.path.split('/')[2],
            // props we will set the model with
            props = {};

        // determine which hand/value this message
        // should pass to
        for(var i in defaults) {
            // left_x will make {x: val} if this is left hand,
            // right_z will make {z: val} if this is right hand
            // @todo strip null chars and compare equal strings
            if(hand_map.indexOf(id + '_' + i) == 0) {
               props[i] = osc.value;
               this.set(props);
               break;
            }
        }
        
    }
    
});