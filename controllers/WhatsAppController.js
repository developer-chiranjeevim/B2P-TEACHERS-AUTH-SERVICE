import twillo from "twilio";


const client = twillo(process.env.VOICE_SID, process.env.VOICE_AUTH_TOKEN)


const sendWhatsAppMessage = async(request, response) => {
    const {customerNumber, params} = request.body;

    if(!customerNumber && !params){
        return response.status(400).response.json({message: "Invalid Body"});
    }

    try{

        const message = await client.messages.create({
            from: `whatsapp:+15557803137`,
            to: `whatsapp:+91${customerNumber}`,
            contentSid: 'HX3337338fbbf9272255931f4a20f0d1dd', 
            contentVariables: JSON.stringify({
                "1": params.name,
                "2": params.time,
                "3": params.link
            })
        });

        response.status(200).json({message: "Message Sent Successfully"});

    }catch(error){
        response.status(500).json({message: "Could Not Deliver WhatsApp Message"});
    };
};



export { sendWhatsAppMessage };