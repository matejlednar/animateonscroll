/**
 * Animate on Scroll - using Animate.css
 * 
 * @param {Object} $ - jQuery
 * @returns {undefined}
 */
(function ($) {
    /**
     * Animate on scroll
     * 
     * User can set global offset or local offect via data-offset
     * 
     * @param {Object} data
     *                  - container {DOMNode} - scrollable element
     *                  - offset {Number} - from bottom 
     * @returns {undefined}
     */
    $.fn.animateOnScroll = function (data) {

        var container = data && data.container ? data.container : window;

        var app = {

            container: container,
            nodes: null,
            containerHeight: container.innerHeight ? container.innerHeight : container.getBoundingClientRect().height,
            correction: data.offset ? -(data.offset) : 0,
            /**
             * Find elements with animation
             * 
             * @returns {undefined}
             */
            findAnimations: function () {

                $("*[data-animation]").each(function (index, node) {

                    node.classList.add("animated");
                    node.classList.add("animate-on-scroll");
                });

                this.nodes = $(".animate-on-scroll");
            },
            /**
             * Detecting element if it is in the viewport
             * If element is in the viewport, starting animation
             * 
             * @returns {undefined}
             */
            checkPosition: function () {

                var animation;
                var posFromTop;
                var nodes = this.nodes, node;
                var containerHeight = this.containerHeight;
                var correction;

                if (this.container != window) {
                    correction = this.container.offsetTop + correction;
                }

                for (var i = 0; i < nodes.length; i++) {

                    node = nodes[i];
                    posFromTop = node.getBoundingClientRect().top;

                    // global offset
                    correction = this.correction;

                    if (this.container != window) {
                        correction = this.container.offsetTop + correction;
                    }

                    // local offset
                    if (node.dataset.offset) {
                        correction = -(node.dataset.offset);
                        if (this.container != window) {
                            correction = this.container.offsetTop + correction;
                        }
                    }

                    if (posFromTop - containerHeight - correction <= 0) {
                        if (node.dataset.animation) {
                            animation = node.dataset.animation;
                            delete node.dataset.animation;
                            node.classList.add(animation);
                        }
                    }
                }
            },
            /**
             * Updating container height on resize and starting animation on visible elements
             * 
             * @returns {undefined}
             */
            resize: function () {
                this.containerHeight = this.container.innerHeight ? this.container.innerHeight : this.container.getBoundingClientRect().height;
                this.checkPosition();
            },
            /**
             * Registering events for scroll and resize
             * 
             * @returns {undefined}
             */
            addEventHandlers: function () {
                $(container).on('scroll', $.proxy(this.checkPosition, this));
                $(container).on('resize', $.proxy(this.resize, this));
            }
        };

        app.findAnimations();
        app.addEventHandlers();
        app.checkPosition();
    };
}(jQuery));
