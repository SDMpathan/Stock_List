import axios from "axios";
import React from "react";
import {Component} from "react";

interface IState{
  res : any
}

interface IProps{

}

const convert = (n:any)=>{
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};

export default class App extends Component<IProps,IState>{
    constructor(props:IProps){
      super(props)
      this.state = {
          res:[]
      }
    };

    componentDidMount(){
      let config = { 'X-CoinAPI-Key': 'F0781C86-ADBC-449D-8245-53711390EEE7_' };
      axios.get(`http://rest.coinapi.io/v1/assets`,{ headers: config }).then((posRes)=>{
        this.setState({
          res:posRes.data
        })
        console.log(posRes.data)
      },(errRes)=>{
        console.log(errRes)
      })
    }  
    
    
    render(){
      return(
        <React.Fragment>
            <div className="header">
              <div className="hQuiki">Quikie</div>
              <div className="hApp">Apps</div>
            </div>

            <div className="card">
              <div className="cardOne">
                  <div className="text1">GOOGLE</div>
                  <img src="https://img-authors.flaticon.com/google.jpg" alt="google" />
                  <div className="one">1515 USD</div>
              </div>
              <div className="cardTwo">
                  <div className="text1">FACEBOOK</div>
                  <img src="https://image.flaticon.com/icons/png/512/124/124010.png" alt="facebook" />
                  <div className="two">266 USD</div>
              </div>
              <div className="cardThree">
                  <div className="text1">AMZN</div>
                  <img src="https://cdn3.iconfinder.com/data/icons/glypho-social-and-other-logos/64/logo-amazon-512.png" alt="amazon" />
                  <div className="thr">3116 USD</div>
              </div>
            </div>
          <table>
            <tr>
             <td className="rowhead">
               Stock Details Table               
             </td>
             <td><input type="text" name="search" placeholder="Search By Company Name"/></td>
            </tr>
            <tr className="rowtop">
              <th>CURRENCY NAME</th>
              <th>SYMBOL</th>
              <th>MARKET CAP</th>
              <th></th>
              <th>CURRENT PRICE</th>
            </tr>
            {this.state.res.map((e:any)=>(
              <tr>
              <td>{e.name}</td>
              <td ><button className="sym">{e.asset_id}</button></td>
              <td>${convert(e.volume_1day_usd)}</td>
              <td><button className="view">view</button></td>
              <td>${convert(e.price_usd)} <br></br> {"USD"}</td>
            </tr>
            ))}            
          </table>
          {/* {JSON.stringify(this.state.res)} */}   
        </React.Fragment>
      )
    }
  }