import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
 
const app = express();
const port = 3000;
const baseURL = "https://api.blockchain.com/v3/exchange";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", async (req,res)=>{
    const symbol = 'BTC-USD';
    try{
        const response = await axios.get(baseURL + `/tickers/${symbol}`); 
            let ticker = response.data;
            res.render("index.ejs",{
                ticker
            }); 
        } catch (err) {
            console.error(`Error: ${err.message}`);
            if (err.response) {
              console.log(err.response.data);
            }
            res.status(500).send("Internal Server Error");
          }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  