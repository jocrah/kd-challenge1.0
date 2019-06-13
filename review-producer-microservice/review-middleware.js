module.exports = function (options) {
    return function (req, res, next) {

        /*
        {
            “business_id”:”222334394944040”
            “msg”:”nice shorts”,
             “type: “produce”, // product, site
             “sources”:”amazon” //  facebook, amazon, kudobuzz
              “Rating”: 4  // 1-5
         }
         */
         
        //validate
        let businessID = req.body.business_id;
        let rating = req.body.rating;
        let msg = req.body.message;
        let source = req.body.source;
        let type = req.body.type;

        var errorMessage = '';
       
        if(!isValidBusinessID(businessID) || !isValidMessage(msg) || 
        !isValidRating(rating) || !isValidType(type) || !isValidSource(source)){
            return res.status(400).send({
                "error": "Invalid parameters",
                "message": errorMessage
            })
        }
        next();
    }

    function isValidBusinessID(id){
        if (typeof id == 'undefined') {
            return false;
          }
          else if(typeof id !== 'number'){
              return false;
          }
          console.log("business id passed");
          return true;
    }

    function isValidRating(rating){
        if (typeof rating == 'undefined') {
            return false;
          }
          else if(typeof rating !== 'number'){
              return false;
          }else if(rating < 0 || rating>5){
              return false;
          }
          console.log("rating passed");
          return true;
    }

    function isValidType(type){
          if (typeof type == 'undefined') {
            return false;
          }
          else if(typeof type !== 'string'){
              console.log('1');
              return false;
          }else if(type === 'product' || type === 'site'){
              console.log("type passed");
              return true;
          }
          return false;
    }

    function isValidMessage(message){
        if (typeof message == 'undefined') {
            return false;
          }
          else if(typeof message !== 'string'){
              return false;
          }
          console.log("message passed");
          return true;
    }

    function isValidSource(source){
        if (typeof source == 'undefined') {
            return false;
          }
          else if(typeof source !== 'string'){
              return false;
          }else if(source === 'amazon' || source === 'facebook'){
              console.log("source passed");
              return true;
          }
          return false;
    }
  }