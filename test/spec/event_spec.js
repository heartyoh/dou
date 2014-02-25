// define(['bower_components/lodash/dist/lodash', 'build/js/event'], function(_, events) {
//     "use strict";

//     describe('Event', function() { 
//         var Animal = function (name) {
//             this.name = name;
//         };
            
//         Animal.prototype = {
//             getName : function () {
//                 return this.name;
//             }
//         }
//         _.extend(Animal.prototype, events);
        
//         describe('#listenTo() #trigger()', function () {
//           it('should receive listening events from the events', function () {

//             var dog = new Animal('wang');
//             var person = _.extend({
//                 run: function (e) {
//                     console.log('person received event');
//                     console.log(e);
//                     this.trigger('run');
//                     this.running = true;
//                 }
//             }, events);
            
//             // dog.on('buck', person.run, person);
//             /* same as */
//             person.listenTo(dog, 'buck', person.run);
//             events.listenTo(dog, 'buck', function(e) {
//                 console.log('I have got an event');
//                 console.log(this, e);
//             });
            
//             dog.trigger('buck');

//             expect(person.running).toBe(true);
//           });
//         });      
//     });
// });


 
//  