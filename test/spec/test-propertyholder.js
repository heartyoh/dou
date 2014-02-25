define(['../src/mixin/PropertyHolder', 'lodash', 'emitter'], function(PropertyHolder, _, Emitter) {
    "use strict";

    describe('PropertyHolder', function() { 
        var Animal = function (name) {
            this.name = name;
            this.attributes = {};
        };
            
        Animal.prototype = {
            getName : function () {
                return this.name;
            }
        }
        _.extend(Animal.prototype, PropertyHolder);
        
        describe('#set() #get()', function () {
          it('should emit change event when its properties are changed', function () {

            var dog = new Animal('wang');
            var person = _.extend({
                running: false,
                run: function (e) {
                    console.log('person received event');
                    console.log(e);
                    this.emit('run');
                    this.running = true;
                }
            }, Emitter);
            
            // dog.on('buck', person.run, person);
            /* same as */
            person.listenTo(dog, 'change', person.run);
            Emitter.listenTo(dog, 'change', function(e) {
                console.log('I have got an change event');
            });
            
            dog.set('buck', 'puck');

            person.running.should.be.true;
          });
        });      
    });
});
