import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import workintech from '/workintech.svg'
import './App.css'
import { Form, Label, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//Bileşenlerim
import OrderPizza from './components/OrderPizza';
import Success from './components/Success';
import Home from './components/Home';



function App() {

  return (
    <>
      <Router>
        <Switch>

          <Route path="/orderPizza" />
          <OrderPizza />
          <Route path="/Home" />
          <Home />
          <Route path="/success" />
          <Success />

        </Switch>
      </Router>
      
      <div className='header'>
        <h1>Teknolojik Yemekler</h1>
        <div className='form gap'>
          <h5><Link to="/Home">Anasayfa</Link></h5>
          <h5>Seçenekler</h5>
          <h5>Sipariş Oluştur</h5>
        </div></div>
      <div className='form'>
        <div>
          <h2>
            Position Absolute Acı Pizza
          </h2>
          <div className='form-row'>
            <h2>85.50₺</h2>
            <p>4.9</p>
            <p>(200)</p></div>
          <p className='justify'>Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir.</p>

        </div>

      </div>
    </>
  )
}

export default App;
