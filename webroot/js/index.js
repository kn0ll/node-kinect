(function() {

    var socket = io.connect('http://localhost'),
        $body = $('body'),
        $win = $(window),
        win_height = $win.height(),
        win_width = $win.width();

    function normalizePoint(value) {
        value *= 100;
        var num = Math.round(value);
        value = num / 100;
        return value;
    }

    var HandView = Backbone.View.extend({

    	initialize: function(options) {

    		var self = this,
                model = new Backbone.Model(),
                path = '\/kinect\/' + options.path + '_(.*)?';

    		model.bind('change:x', _.bind(self.setX, self));
    		model.bind('change:y', _.bind(self.setY, self));
    		model.bind('change:z', _.bind(self.setZ, self));

            socket.on('osc', function(msg) {
                var match = msg.path.match(path),
                    opts = {};
                if (match) {
                    opts[match[1]] = msg.params[0];
                    model.set(opts);
                }
            });

    	},

    	setX: function(m, x) {
            var val = normalizePoint(x);
    		this.$el.css({
    			left: Math.round(win_width * val)
    		});
    	},

    	setY: function(m, y) {
            var val = normalizePoint(y);
    		this.$el.css({
    			bottom: Math.round(win_height * val)
    		});
    	},

    	setZ: function(m, z) {
            var val = normalizePoint(z) + 1;
            this.$el.css({
                zoom: val * 100 + '%'
            });
    	},

    	render: function() {
    		return this.$el.css({
    			background: 'black',
    			width: 60,
    			height: 60,
    			position: 'absolute',
                borderRadius: 30
    		});
    	}

    });

    $(function() {
        var $body = $('body');
        new HandView({ path: 'left' }).render().appendTo($body);
        new HandView({ path: 'right' }).render().appendTo($body);
    });

})();