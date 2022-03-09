export default function handler(request, response){ 
    const isPost = request.method === "POST";
    const hasBodyWithAtLeastOneKeyValuePair = request.body && Object.keys(request.body).length > 0
    
    if (isPost && hasBodyWithAtLeastOneKeyValuePair){ 
    response.status(200).json( { 
        now:new Date()
    } )
    } else { 
        response.status(400).json( {error:"Bad request. Not a POST request with a request body that has at least one key/value pair."} )
    }
}