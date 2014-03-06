define(['utils', 'event'], function(utils, event) {
    "use strict";

    describe('(Core) Event', function() { 
        describe('#listenTo() #trigger()', function () {
          it('should receive listening event from the event', function () {

	        var Animal = function (name) {
	            this.name = name;
	        };
	            
	        Animal.prototype = {
	            getName : function () {
	                return this.name;
	            }
	        }

	        utils.merge(Animal.prototype, event);
        
            var dog = new Animal('wang');
            var person = utils.merge({
                run: function (e) {
                    this.trigger('run');
                    this.running = true;
                }
            }, event);

			// event subscribing
            // dog.on('buck', person.run, person);
            person.listenTo(dog, 'buck', person.run);

            event.listenTo(dog, 'buck', function(e) {
                // console.log('I have got an event');
                // console.log(this, e);
            });
            
            // event firing
            dog.trigger('buck');

            expect(person.running).to.equal(true);
          });
        });

        describe('listenTo all', function () {
          it('should receive all kind of event from the event source', function () {

            var Animal = function (name) {
                this.name = name;
            };
                
            utils.merge(Animal.prototype, event);

            var dog = new Animal('wang');
            var name;

            dog.on('all', function(dogname) {
                name = dogname;
            });

            dog.trigger('buck', dog.name);

            expect(name).to.equal(dog.name);
          });
        });      
    });
});


 
 