const stripe= require("stripe")('sk_test_51NvWYSBiB2v4GnrlXeZfHcGvRcfgMgVGSCiBk0THydX7gxxYZBlGCGB0VRALeFe20I4tDAkqBETAyo52J0ZhzfpH001uq9a1Pz')



async function stripePayment(req,res){
    const {product, totalPrice}= req.body
    const lineItems= product.map((element)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:element.title,
                // price:element.price*100
                
            },
            unit_amount: totalPrice*100,
 },
        quantity: element.quantity

    }))

    try {

        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url:"http://localhost:3000/order",
             cancel_url:"http://localhost:3000",
        });
        console.log(session);
        
        res.json({id:session.id})
        
        
    } catch (error) {
        console.log(error);
        res.json(error)
    }

   
   
}

module.exports={stripePayment}

