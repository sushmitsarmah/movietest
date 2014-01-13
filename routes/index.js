
/*
 * GET home page.
 */

exports.index = function(req, res){
	// console.log(req.json)
  res.render('index', { title: 'The Movie Library',json:req.json });
};