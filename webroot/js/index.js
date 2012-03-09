(function() {

    var socket = io.connect('http://localhost');

    var HandView = Backbone.View.extend({

    	initialize: function(options) {

    		var self = this,
                model = new Backbone.Model();

    		model.bind('change:x', _.bind(self.setX, self));
    		model.bind('change:y', _.bind(self.setY, self));
    		model.bind('change:z', _.bind(self.setZ, self));

    		socket.on('change:' + options.path, function(coords) {
    			model.set(coords);
    		});

    	},

    	setX: function(m, x) {
    		this.$el.css({
    			left: x
    		});
    	},

    	setY: function(m, y) {
    		this.$el.css({
    			top: y
    		});
    	},

    	setZ: function(m, z) {
    		console.log('setting z', z);
    	},

    	render: function() {
    		return this.$el.css({
    			background: 'black',
    			width: 20,
    			height: 20,
    			position: 'absolute'
    		});
    	}

    });

    $(function() {
        var $body = $('body');
        new HandView({ path: 'left' }).render().appendTo($body);
        new HandView({ path: 'right' }).render().appendTo($body);
    });

})();