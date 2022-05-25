const   mongoose    =   require('mongoose'),
        Print       =   require('./models/print'),
        Comment     =   require('./models/comment');

// const data = [
//         {
//             name:"Iron man 3", 
//             Artist:"Phantom City Creative", 
//             url:"https://collider.com/wp-content/uploads/iron-man-3-mondo-poster-phantom-city-creative.jpg"
//         },
//         {
//             name:"The lord of the rings", 
//             Artist:"Gabz", 
//             url:"https://assets.bigcartel.com/product_images/317084082/LOTR_Variant_Gabz_1500x1000px.jpg?auto=format&fit=max&w=1500"
//         },
//         {
//             name:"Iron man", 
//             Artist:"Marko Manev", 
//             url:"https://images.squarespace-cdn.com/content/v1/6117360e2f0be106838fc4e6/20aac3d7-eafb-4c3d-9450-36fa38f3dac5/Iron-Man.jpg"
//         }
//     ];
function seedDB(){
    Print.remove({},function(err){
        if(err){
            console.log(err)
        } else {
            console.log('Data removal complete');
        //     data.forEach(function(seed){
        //         Print.create(seed, function(err, print){
        //             if(err){
        //                 console.log(err);
        //             } else {
        //                 console.log('New data added!');
        //                 // Comment.create({
        //                 //     author: 'Tony Stark',
        //                 //     text: 'This is my FAV!'
        //                 // }, function(err, comment){
        //                 //     if(err){
        //                 //         console.log(err)
        //                 //     } else {
        //                 //         print.comments.push(comment);
        //                 //         print.save();
        //                 //     }
        //                 // });
        //             }
        //         });
        //     });
        }
    });
}

module.exports = seedDB;