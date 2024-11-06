import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import workintech from '/workintech.svg'
import './App.css'
import { Form, Label, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const malzemeList = [
  "Pepperoni", "Sosis", "Kanada Jambonu", "Tavuk Izgara", "Soğan", "Domates", "Mısır", "Sucuk", "Jalepeno", "Sarımsak", "Biber", "Ananas", "Kabak"
]
const boyutlar = [
  "Küçük", "Orta", "Büyük"
]

const initialForm = {
  name: "",
  boyut: "",
  hamurKalinligi: "",
  malzemeler: [],
  siparisNotu: "",
  terms1: false,
  terms2: false
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [toplam, setToplam] = useState(0)

  useEffect(() => {
    const fiyat = 85.50;  
    const secimler = form.malzemeler.length * 5; 
    const total = (fiyat + secimler).toFixed(2);  // Toplam fiyatı hesapla ve formatla
    setToplam(total);  // Toplamı güncelle
  }, [form.malzemeler]);

  useEffect(() => {
    const errors = {};

    if (form.name.length < 3 && form.name.length > 0) {
      errors.name = "İsim en az 3 karakter olmalı.";
    }

    if (form.malzemeler.length < 4) {
      errors.malzemeler = "En az 4 malzeme seçmelisiniz.(5₺)";
    }

    if (form.malzemeler.length > 10) {
      errors.malzemeler = "En fazla 10 malzeme seçebilirsiniz.";
    }

    setFormErrors(errors); // Hata mesajlarını güncelle
  }, [form]);


  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;


    if (type === 'checkbox') {
      setForm((prevForm) => {
        const updatedMalzemeler = checked
          ? [...prevForm.malzemeler, value]
          : prevForm.malzemeler.filter(malzeme => malzeme !== value);

        return { ...prevForm, malzemeler: updatedMalzemeler };
      });
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Form gönderiliyor:", form);

    try {
      const response = await axios.post('https://reqres.in/api/pizza', form);
      console.log("Gelen Yanıt" ,response.data);

      console.log("Sipariş Özeti:", response.data)

      alert("Siparişiniz başarıyla alındı!");
      setForm(initialForm);
      setFormErrors({});

    } catch (error) {
      console.error("Veri gönderme hatası:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };
    
  
  return (
    <>
      <div className='header'>
        <h1>Teknolojik Yemekler</h1>
        <div className='form gap'>
          <h5>Anasayfa</h5>
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

        <Form onSubmit={handleSubmit}>

          <div>
            <Label htmlFor="name">Ad-Soyad</Label>
            <Input
              id="name"
              name="name"
              placeholder="Adınızı ve soyadınızı giriniz."
              type="text"
              onChange={handleChange}
              value={form.name}
            />
            {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}
          </div>

          <div className='form-row'>
            <div>
              <Label>Boyut Seç</Label>
              <div>
                {boyutlar.map((boyut) => (
                  <Label key={boyut}>
                    <input
                      type='radio'
                      name='boyut'
                      value={boyut}
                      onChange={handleChange}
                      checked={form.boyut === boyut}
                    />
                    {boyut}
                  </Label>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="hamur">Hamur Seç</Label>
              <Input
                type="select"
                name="hamurKalinligi"
                id="hamur"
                value={form.hamurKalinligi}
                onChange={handleChange}
              >
                <option value="-1" disabled>Hamur Kalınlığı</option>
                <option value="Ince">İnce</option>
                <option value="Orta">Orta</option>
                <option value="Kalın">Kalın</option>
              </Input>
            </div>
          </div>
          <div>
            <Label htmlFor='malzemeler'>Ek Malzemeler</Label>
            {formErrors.malzemeler && (
              <p style={{ color: 'grey' }}>{formErrors.malzemeler}</p>
            )}
            {malzemeList.map((malzeme) => (
              <div key={malzeme}>
                <Label check>
                  <Input
                    id='malzemeler'
                    type="checkbox"
                    name="malzemeler"
                    value={malzeme}
                    onChange={handleChange}
                    checked={form.malzemeler.includes(malzeme)}
                    disabled={form.malzemeler.length >= 10 && !form.malzemeler.includes(malzeme)}

                  />
                  {malzeme}

                </Label>
              </div>
            ))}

          </div>
          <div>
            <Label for="siparisNotu">Sipariş Notu</Label>
            <Input
              id="siparisNotu"
              name="siparisNotu"
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              type="textarea"
              onChange={handleChange}
              value={form.siparisNotu}
            />
          </div>

          <div>
            <p>Sipariş Toplamı</p>
            <p>Seçimler: {(form.malzemeler.length * 5).toFixed(2)}₺</p>
            <p>Toplam: {toplam}₺</p>
          </div>
          <div>
            <Button type='button'>Ekleme Çıkarma</Button>
            <Button type='submit' disabled={form.name.length < 3 || !form.boyut || form.malzemeler.length < 4 || form.malzemeler.length > 10}>Sipariş Ver</Button>

          </div>

        </Form>
      </div>
    </>
  )
}

export default App;
