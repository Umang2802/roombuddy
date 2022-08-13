const spawn = require("child_process").spawn;
module.exports.mlmodelpredict = async (req, res) => {
  var dataToSend;
  // spawn new child process to call the python script
  const { location, total_sqft, bath, bhk } = req.body;
  const python = spawn("python", [
    "python controllers/predictprice.py",
    location,
    total_sqft,
    bath,
    bhk,
  ]);
  python.stderr.pipe(process.stderr);
  // collect data from script
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    dataToSend = data.toString();
    res.send(dataToSend);
    // res.write(data);
    // res.end("end");
  });
  // in close event we are sure that stream from child process is closed
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    // res.send(dataToSend);
  });
};
