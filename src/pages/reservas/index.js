import React, { useRef, useState, useEffect } from 'react';
import Separador from '../../assets/imagens/separador-branco.png';
import emailjs from 'emailjs-com';
import { emailjsConfig } from '../../config/emailjs-config';
import ReCAPTCHA from 'react-google-recaptcha';
import './styles.css';

function Reservas() {

    const form = useRef();
    const recaptchaRef = useRef()
    const [recaptchaValue, setRecaptchaValue] = useState('');

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dataEntrada, setDataEntrada] = useState('');
    const [dataSaida, setDataSaida] = useState('');
    const [tipoAcomodacao, setTipoAcomodacao] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [email, setEmail] = useState('')

    const changeRecaptchaValue = () => {
        const res = recaptchaRef.current.getValue();
        setRecaptchaValue(res);
        console.log(recaptchaValue);
    }

    const getNome = (e) => setNome(e.target.value);
    const getTelefone = (e) => setTelefone(e.target.value);
    const getDataEntrada = (e) => setDataEntrada(e.target.value);
    const getDataSaida = (e) => setDataSaida(e.target.value);
    const getTipoAcomodacao = (e) => setTipoAcomodacao(e.target.value);
    const getMensagem = (e) => setMensagem(e.target.value);
    const getEmail = (e) => setEmail(e.target.value);

    const sendMail = (e) => {
        e.preventDefault();

        if (recaptchaValue != "" &&
            nome != "" && telefone != "" &&
            dataEntrada != "" && dataSaida != "" &&
            tipoAcomodacao != "" && mensagem != "") {
            emailjs.sendForm(emailjsConfig.serviceId, emailjsConfig.templateId, form.current, emailjsConfig.userId)
                .then((result) => {
                    console.log(result.text);
                    alert("Email enviado com sucesso!");
                    setNome('');
                    setTelefone('');
                    setDataEntrada('');
                    setDataSaida('');
                    setTipoAcomodacao('');
                    setMensagem('');
                    setEmail('')
                })
                .catch((error) => {
                    console.log(error.text);
                });
        } else {
            alert("Preencha corretamente o formul??rio");
            console.log("Preencha o recaptcha");
        }
    }

    useEffect(() => {
        console.log(`Nome: ${nome}`);
        console.log(`Telefone: ${telefone}`);
        console.log(`Data de entrada: ${dataEntrada}`);
        console.log(`Data de sa??da: ${dataSaida}`);
        console.log(`Tipo de acomoda????o: ${tipoAcomodacao}`);
        console.log(`Mensagem: ${mensagem}`);
        console.log(`Email: ${email}`);
    }, [nome, telefone, dataEntrada, dataSaida, tipoAcomodacao, mensagem, email]);

    return (
        <section className="reservas-container">
            <div className="reservas-overlay" id="reservas_contato">
                <img src={Separador} />
                <h2 className="reservas-title">reservas e contato</h2>
                <form ref={form} onSubmit={sendMail} className="d-flex w-100 justify-content-center flex-column align-items-center">
                    
                    <input type="hidden" value="pousadatarumim@gmail.com" name="email" />
                    {/* <input type="hidden" value="alex.trader666@gmail.com" name="email" /> */}
                    
                    <div className="container-form">
                        <div className="col">
                            <div className="form-group mb-3">
                                <label className="form-label">Nome:</label>
                                <input value={nome} onChange={(text) => getNome(text)} name="nome" className="form-control" placeholder="Digite seu nome" type="text" />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Contato:</label>
                                <input value={telefone} onChange={(text) => getTelefone(text)} name="telefone" className="form-control" placeholder="Digite seu telefone" type="tel" />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Data de Chegada:</label>
                                <input value={dataEntrada} onChange={(text) => getDataEntrada(text)} name="data_entrada" className="form-control" placeholder="00/00/0000" type="date" />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Data de Sa??da:</label>
                                <input value={dataSaida} onChange={(text) => getDataSaida(text)} name="data_saida" className="form-control" placeholder="00/00/0000" type="date" />
                            </div>
                        </div>
                        <div className="col mt-3">
                            <p className="form-title-section">tipo de acomoda????o:</p>
                            <div className="form-check mb-2">
                                <input value={tipoAcomodacao} onChange={(text) => getTipoAcomodacao(text)} name="tipo_acomodacao" value="Quarto Triplo" type="radio" className="form-check-input" />
                                <label className="form-check-label">Quarto Triplo</label>
                            </div>

                            <div className="form-check mb-2">
                                <input value={tipoAcomodacao} onChange={(text) => getTipoAcomodacao(text)} name="tipo_acomodacao" value="Quarto Qu??druplo" type="radio" className="form-check-input" />
                                <label className="form-check-label">Quarto Qu??druplo</label>
                            </div>

                            <div className="form-check mb-4">
                                <input value={tipoAcomodacao} onChange={(text) => getTipoAcomodacao(text)} name="tipo_acomodacao" value="Quarto Casal" type="radio" className="form-check-input" />
                                <label className="form-check-label">Quarto Casal</label>
                            </div>

                            <div className='form-group mb-4'>
                                <label className='form-label'>Email</label>
                                <input type="email" value={email} onChange={(text) => getEmail(text)} className='form-control' name="mail_hospede" placeholder='Digite seu email' />
                            </div>

                            <p className="form-title-section">mensagem</p>
                            <textarea value={mensagem} onChange={(text) => getMensagem(text)} name="mensagem" className="form-control" rows="4" placeholder="Digite sua mensagem"></textarea>
                        </div>
                    </div>

                    <br />
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LdjLngcAAAAACLqhj6l9d7SDT6BUlo8uGCZQIUv"
                        onChange={() => changeRecaptchaValue()}
                    />

                    <button className="btn-form">enviar</button>

                    <div className="form-divider"></div>
                </form>
                <p className="reservas-details">pousadatarumim@gmail.com<br />
                    Tel: 75 3344-1083<br />
                    WhatsApp: 75 9 8279-9804<br />
                    Vale do Cap??o -  Chapada Diamantina - BA - Brasil</p>
                <img src={Separador} className="flip" />
            </div>
        </section>
    );
}

export default Reservas;