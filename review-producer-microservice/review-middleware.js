module.exports = function (options) {
    let errorMessage = '';
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

       
        if(!isValidBusinessID(businessID) || !isValidMessage(msg) || 
        !isValidRating(rating) || !isValidType(type) || !isValidSource(source)){
            // return bad request
            return res.status(400).send({
                "error": "Invalid parameters",
                "message": errorMessage
            })
        }
        next();
    }

    function isValidBusinessID(id){
        if (typeof id == 'undefined') {
            errorMessage = "business_id parameter is required"
            return false;
          }
          else if(typeof id !== 'number'){
            errorMessage = "business_id parameter should be a number"
            return false;
          }
          return true;
    }

    function isValidRating(rating){
        if (typeof rating == 'undefined') {
            errorMessage = "rating parameter is required"
            return false;
          }
          else if(typeof rating !== 'number'){
              errorMessage = "rating parameter must be a number"
              return false;
          }else if(rating < 0 || rating>5){
              errorMessage = "rating parameter must fall between 1 and 5"
              return false;
          }
          return true;
    }

    function isValidType(type){
          if (typeof type == 'undefined') {
            errorMessage = "type parameter is required"
            return false;
          }
          else if(typeof type !== 'string'){
            errorMessage = "type parameter must be a string"
              return false;
          }else if(type === 'product' || type === 'site'){
              return true;
          }
          errorMessage = "type should either be 'product' or 'site'"
          return false;
    }

    function isValidMessage(message){
        if (typeof message == 'undefined') {
            errorMessage = "msg parameter is required"
            return false;
          }
          else if(typeof message !== 'string'){
            errorMessage = "msg parameter is required"
            return false;
          }
          return true;
    }

    function isValidSource(source){
        if (typeof source == 'undefined') {
            errorMessage = "source parameter is required"
            return false;
          }
          else if(typeof source !== 'string'){
            errorMessage = "source parameter must be a string"
              return false;
          }else if(source === 'amazon' || source === 'facebook' || source === 'kudobuzz'){
              return true;
          }
          errorMessage = "source should either be 'amazon', 'facebook' or 'kudobuzz'"
          return false;
    }
  }