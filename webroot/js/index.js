$(function() {

	var socket = io.connect('http://localhost');

	  socket.on('news', function (data) {
	    console.log(data);
	    socket.emit('my other event', { my: 'data' });
	  });

    var Hand = Backbone.Model.extend({
    	defaults: {
    		x: 0,
    		y: 0,
    		z: 0
    	}
    });

    var HandView = Backbone.View.extend({
    	initialize: function() {
    		var self = this,
    			model = self.model,
    			id = model.get('id');
    		_.bindAll(this);
    		model.bind('change:x', self.setX);
    		model.bind('change:y', self.setY);
    		model.bind('change:z', self.setZ);
    		socket.on('change:' + id, function(coords) {
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

    var LeftHand = HandView.extend({
    	initialize: function() {
    		this.model = new Hand({ id: 'left' });
    		HandView.prototype.initialize.apply(this, arguments);
    	}
    });

    var RightHand = HandView.extend({
    	initialize: function() {
    		this.model = new Hand({ id: 'right' });
    		HandView.prototype.initialize.apply(this, arguments);
    	}
    });

    $('body')
	    .append((new LeftHand()).render())
	    .append((new RightHand()).render());

});