$(function() {
    
    var $body = $('body'),
        $win = $(window),
        win_height = $win.height(),
        win_width = $win.width();
    
    window.HandView = Backbone.View.extend({
        
        $view: null,
        
        initialize: function(hand) {
            
            hand.bind('change:x', this.updateX);
            hand.bind('change:y', this.updateY);
            hand.bind('change:z', this.updateZ);
            
            this.$view =
                $('<img />')
                    .addClass('hand')
                    .attr('src', '/webroot/img/' + this.id + '-hand.png')
                    .appendTo($body);
            
            // get width and height for z calculations
            this.width = this.$view.width();
            this.height = this.$view.height();
            
        },
        
        updateX: function(model, value) {
            value = normalizePoint(value);
            model.view.$view.css({
                left: Math.round(win_width * value)
            });
        },
        
        updateY: function(model, value) {
            value = normalizePoint(value);
            model.view.$view.css({
                bottom: Math.round(win_height * value)
            });
        },
        
        updateZ: function(model, value) {
            // 2 give greater than a 2x scale (from 2*2 instead of 1*2)
            // + 1 to offset 0 (1*1 for 100%)
            value = ((normalizePoint(value) * 2) + 1);
            // scale according to original width/height
            model.view.$view.css({
                width:  value * model.view.width,
                height: value * model.view.height
            });
        }
        
    });
    
    function normalizePoint(value) {
        value *= 100;
        var num = Math.round(value);
        value = num / 100;
        return value;
    }
    
});