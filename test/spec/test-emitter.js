define(['lodash', 'emitter'], function(_, emitter) {
    "use strict";

    describe('Emitter', function() { 
        var Animal = function (name) {
            this.name = name;
        };
            
        Animal.prototype = {
            getName : function () {
                return this.name;
            }
        }
        _.extend(Animal.prototype, emitter);
        
        describe('#listenTo() #emit()', function () {
          it('should receive listening events from the emitter', function () {

            var dog = new Animal('wang');
            var person = _.extend({
                run: function (e) {
                    console.log('person received event');
                    console.log(e);
                    this.emit('run');
                    this.running = true;
                }
            }, emitter);
            
            // dog.on('buck', person.run, person);
            /* same as */
            person.listenTo(dog, 'buck', person.run);
            emitter.listenTo(dog, 'buck', function(e) {
                console.log('I have got an event');
                console.log(this, e);
            });
            
            dog.emit('buck');

            person.running.should.be.true;
          });
        });      
    });
});


 
 