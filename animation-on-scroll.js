/**
 * 
 * @param {Object} $
 * @returns {undefined}
 */
(function ($) {
    /**
     * Animate on scroll
     * 
     * @param {Object} data
     * @returns {undefined}
     */
    $.fn.animateOnScroll = function (data) {

        var container = data && data.container ? data.container : window;

        var app = {

            container: container,
            nodes: null,
            containerHeight: container.innerHeight,

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
                var nodes = this.nodes;
                var containerHeight = this.containerHeight;

                for (var i = 0; i < nodes.length; i++) {

                    var posFromTop = nodes[i].getBoundingClientRect().top;

                    if (posFromTop - containerHeight <= 0) {
                        if (nodes[i].dataset.animation) {
                            animation = nodes[i].dataset.animation;
                            delete nodes[i].dataset.animation;
                            nodes[i].classList.add(animation);
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
                this.containerHeight = container.innerHeight;
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

        /* Params
         * - firstAnimation - delay time
         * - changeViewPosition - start animate soon or later - number (length in pixels)
         * - containerElement - if content is in another scrollable element
         */

        app.findAnimations();
        app.addEventHandlers();
        app.checkPosition();
    };
}(jQuery));
