import Head from 'next/head'
import Image from 'next/image'
import home from '../styles/Home.module.css'
import users from '../public/users.json'
import orders from '../public/orders.json'
import transport from '../public/transport.json'
import {Cell, Grid} from "styled-css-grid"
import styled from "styled-components"
import {useRouter} from "next/router"
import {useEffect, useReducer, useRef, useState} from "react"
import Table from 'react-bootstrap/Table'
import {JsonDataDisplay} from "../public/jsontable.jsx"
import DataGrid from 'react-data-grid';
import React, { useCallback } from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";


export default function Home() {
let value=[];
const [checkId, ChangeCheckId]= useState();
const [checkIdTransport, ChangeCheckIdTransport]= useState();
const[coory, changeY]=useState();
const[coorx, changeX]=useState();
const[coory2, changeY2]=useState();
const[coorx2, changeX2]=useState();
const [rightclickid, changerightclickid]= useState();
const[contextMenuDiv, changeMenu]=useState(false);
const [ActiveTransport, ChangeActiveTransport]= useState(false);

 //полученные данные с api
  const gridRef = useRef();

const Button = styled.button`
  background-color: #65b3ff;
  color: white;
  font-size: 0.8vw;
  padding: 2px 20px;
  border-radius: 5px;
  border-color: #FFF;
  cursor: pointer;
`;

    const router = useRouter();
    const columns = [
        { key: 'id_order', name: 'Номер заказа' },
        { key: 'date_time_order', name: 'Дата/Время заказа' },
        { key: 'id_user', name: 'Заказчик (пользователь)' },
        { key: 'adress_A', name: 'Адрес точки отправления' },
        { key: 'adress_B', name: 'Адрес точки назначения' },
        { key: 'status', name: 'Состояние заказа' },
        { key: 'id_transport', name: 'Выделенный транспорт' },
        { key: 'id_operator', name: 'Оператор (пользователь)' }
    ];
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    const [ContentMenu, setContent]= useState(true);
    const [ContentMenu2, setContent2]= useState(false);
    const [formadd, AddNewForm]= useState(false);
    const [cardTransport, activateCardTransport]= useState(false);
    const [cardTransportAdd, activateCardTransportAdd]= useState(false);

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }
    function hideAllError(str) {return true;}

    const onImageChange2 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage2(URL.createObjectURL(event.target.files[0]));
        }
    }

    const [indexToEdit, setIndexToEdit] = useState(-1);
    const [entries, setEntries] = useState([
        {
            id_order: 1,
            date_time_order: "2022-06-06T19:30",
            id_user:2 ,
            adress_A: "Новосибирск",
            adress_B:"Томск" ,
            status: "Закрыт" ,
            id_transport:1 ,
            id_operator: 1
        },
        {
            id_order:2,
            date_time_order: "2022-06-07T20:00",
            id_user:1 ,
            adress_A: "Сочи",
            adress_B:"Норильск" ,
            status: "Отменен" ,
            id_transport:3 ,
            id_operator: 2
        },
        {
            id_order: 3,
            date_time_order: "2022-03-03T12:00",
            id_user:2 ,
            adress_A: "Омск",
            adress_B:"Томск" ,
            status: "Выполнен" ,
            id_transport:2 ,
            id_operator: 3
        },
        {
            id_order:4,
            date_time_order: "2022-02-14T01:30",
            id_user:3 ,
            adress_A: "Санкт-Петербург",
            adress_B: "Грозный",
            status: "Выполнен" ,
            id_transport:1 ,
            id_operator: 1
        },
        {
            id_order:5,
            date_time_order: "2022-07-15T01:30",
            id_user:3 ,
            adress_A: "Санкт-Петербург",
            adress_B: "Грозный",
            status: "Активный" ,
            id_transport:'' ,
            id_operator: 1
        }
    ])

    const [entriesTransport, setEntriesTransport] = useState([
            {
                "id_transport1": 1,
                "marka": "Toyota",
                "model":2,
                "year_of_born": "2010",
                "number_registrion":"BVC 901-045-111" ,
                "status":'Списан',
                "data_registrion": "2011" ,
                "data_delete":"2022",
                "img":'',
                "img2":''
            },
            {
                "id_transport1": 2,
                "marka": "DJI",
                "model":1,
                "year_of_born": "2021",
                "number_registrion":"AWR 992-103-982",
                "status":'Активен',
                "data_registrion": "2021" ,
                "data_delete":"",
                "img":'',
                "img2":''
            },
            {
                "id_transport1": 3,
                "marka": "Northrop",
                "model":4,
                "year_of_born": "2013",
                "number_registrion":"ABC 911-122-999",
                "status":'Требует списания',
                "data_registrion": "2014" ,
                "data_delete":"",
                "img":'',
                "img2":''
            },
            {
                "id_transport1": 4,
                "marka": "Airbus",
                "model":25,
                "year_of_born": "2020",
                "number_registrion":"ABV 992-123-986" ,
                "status":'Активен',
                "data_registrion": "2021",
                "data_delete":"",
                "img":'',
                "img2":''
            }
        ]
    )


function JsonDataDisplay() {
    return (
<div>
    <table id="myTable" cellSpacing="0" rules="all" border="1" style={{borderCollapse: "collapse", width:"40%", marginLeft:"5%"}} className={home.text_tables_setting}>
        <thead>
        <th>&nbsp;</th>
        <th>Номер заказа</th>
        <th>Дата/Время заказа</th>
        <th>Заказчик (пользователь)</th>
        <th>Адрес точки отправления</th>
        <th>Адрес точки назначения</th>
        <th>Состояние заказа</th>
        <th>Выделенный транспорт</th>
        <th>Оператор (пользователь)</th>
        </thead>
        <tbody>
        {entries.map((entry, recordIdx) => (
            <tr>
                <td><Button onClick={()=>onClickButtonOpen(event,entry.id_order)}>Открыть</Button></td>
                <td>{entry.id_order}</td>
                <td>{entry.date_time_order}</td>
                <td>{entry.id_user}</td>
                <td>{entry.adress_A}</td>
                <td>{entry.adress_B}</td>
                <td>{entry.status}</td>
                <td>{entry.id_transport}</td>
                <td>{entry.id_operator}</td>
            </tr>
        ))}
        </tbody>
    </table>
</div>
    )
}


    function onMoseMoveStatus(e) {
        changeX(e.clientX);
        changeY(e.clientY);
    }



    function JsonDataDisplayTime() {
    return (
<div>
    {contextMenuDiv ?
        <div style={{position:"absolute",top:coory2, left:coorx2 }} id="contextMenu">
            <Button onClick={()=>statusOverClick(event)}>Списать</Button>
        </div>
        :null}
    <table id="myTableTime" cellSpacing="0" rules="all" border="1" style={{borderCollapse: "collapse", width:"10%", marginLeft:"15%"}} className={home.text_tables_setting}>
        <thead>
        <th>&nbsp;</th>
        <th>id транспорта</th>
        <th>Марка</th>
        <th>Модель</th>
        <th>Год производства</th>
        <th>Регистрационный номер</th>
        <th>Статус</th>
        <th>Дата регистрации</th>
        <th>Дата списания</th>
        <th>Фото</th>
        <th>Фото2</th>
        </thead>
        <tbody>{
        entriesTransport.map(
        (time) => {
            return (
            <tr id="demo" onMouseMove={()=>onMoseMoveStatus(event)} onClick={()=>leftClickMenu(event)} onAuxClick={()=>rightClick(event,time.id_transport1)}>
                <td id={"load1"} ><Button onClick={()=>onClickButtonOpenTransport(event,time.marka,time.id_transport1)}>Открыть</Button></td>
            <td id={"load2"} className={home.style_tr}>{time.id_transport1}</td>
            <td id={"load3"} className={home.style_tr}>{time.marka}</td>
            <td id={"load4"} className={home.style_tr}>{time.model}</td>
            <td id={"load5"} className={home.style_tr}>{time.year_of_born}</td>
            <td id={"load6"} className={home.style_tr}>{time.number_registrion}</td>
                <td id={"load7"} className={home.style_tr}>{time.status}</td>
            <td id={"load8"} className={home.style_tr}>{time.data_registrion}</td>
            <td id={"load9"} className={home.style_tr}>{time.data_delete}</td>
                <td id={"load10"} className={home.style_tr}>{
                    <img style={{width:"70%"}} src={time.img} alt="preview image" />
                }</td>
                <td id={"load11"} className={home.style_tr}>{
                    <img style={{width:"70%"}} src={time.img2} alt="preview image" />
                }</td>
            </tr>
            )
        }
        )}
        </tbody>
    </table>

</div>
    )
}


function onChangeInputText(){
  var input, filter, table, tr, td, i;
  input = document.getElementById("text_input");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

 for ( i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[6];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
}
}

function onClickButtonOpen(e, id){
ChangeCheckId(id)
if(entries[id-1].status==="Активный"){
ChangeActiveTransport(true);
    AddNewForm(false);
}
else{
    AddNewForm(true);
    ChangeActiveTransport(false);
}
}

    function onClickButtonOpenTransport(event, marka,id_transport1) {
        let varw=id_transport1-1;
        if(marka==''){
            ChangeCheckIdTransport(varw);

            activateCardTransportAdd(true);
            activateCardTransport(false);
        }
        else{
            ChangeCheckIdTransport(id_transport1);

            activateCardTransport(true);
            activateCardTransportAdd(false);
        }
    }

function onChangeInputDate(){
var input, filter, table, tr, td, i;
  input = document.getElementById("date_input");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

 for ( i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
}
}

    function onChangeInputReg(){
        var input, filter, table, tr, td, i;
        input = document.getElementById("reg_input");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTableTime");
        tr = table.getElementsByTagName("tr");

        for ( i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[5];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    function onChangeInputModel(){
        var input, filter, table, tr, td, i;
        input = document.getElementById("model_input");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTableTime");
        tr = table.getElementsByTagName("tr");

        for ( i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[3];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    function onChangeInputMark(){
        var input, filter, table, tr, td, i;
        input = document.getElementById("marka_input");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTableTime");
        tr = table.getElementsByTagName("tr");

        for ( i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[2];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    function OnClickOrders(){
    setContent(true);
    setContent2(false);
    }

    function OnClickTransport(){
    setContent(false);
    setContent2(true);
    }


    let authorization=users[0].Authorization;

    function changeTransport(event, checkId, entries,recordIdx) {
            setIndexToEdit(checkId-1);
    }

    function onClickChange() {
        let newArr = [...entries];
        let value = document.getElementById("et"+[checkId-1]).value
        newArr[checkId-1].id_transport = value;
        setEntries(newArr)
    }

    function onClickChangeStatus() {
        let newArr = [...entries];
        let value = "Исполняется";
        newArr[checkId-1].status = value;
        setEntries(newArr)
        AddNewForm(true);
        ChangeActiveTransport(false);
    }

    function onClickChangeStatusCancel() {
        let newArr = [...entries];
        let value = "Отменен";
        newArr[checkId-1].status = value;
        setEntries(newArr)
        AddNewForm(true);
        ChangeActiveTransport(false);
    }
    function onClickChangeStatusClose() {
        let newArr = [...entries];
        let value = "Закрыт";
        newArr[checkId-1].status = value;
        setEntries(newArr)
        AddNewForm(true);
        ChangeActiveTransport(false);
    }

    function rightClick(event,id_transport1) {
        document.oncontextmenu = function() {return false;};
        if(contextMenuDiv==true){
            changeMenu(false);
        }
        else{
         changeX2(coorx)
            changeY2(coory)
            changeMenu(true);
         changerightclickid(id_transport1)
        }

    }

    function leftClickMenu(event) {
        if(contextMenuDiv==true){
            changeMenu(false);
        }

    }
    function statusOverClick(event) {
        event.preventDefault();
        let newArr = [...entriesTransport];
        let value = "Списан";
        let year_value="2022";
        newArr[rightclickid-1].status = value
        newArr[rightclickid-1].data_delete = year_value;
        setEntriesTransport(newArr)
    }
    function onClickSave() {
        console.log(checkIdTransport);
        let value2 = document.getElementById('marka_transport_save'+[checkIdTransport-1]).value;
        let value3 = document.getElementById('model_transport_save'+[checkIdTransport-1]).value;
        let value4 = document.getElementById('year_of_born_save'+[checkIdTransport-1]).value;
        let value5 = document.getElementById('number_transport_save'+[checkIdTransport-1]).value;
        let valueS = "Активен";
        let value6 = document.getElementById('data_reg_transport_save'+[checkIdTransport-1]).value;
        let value7 = document.getElementById('data_end_transport_save'+[checkIdTransport-1]).value;
        let value8=image;
        let value9=image2;
        if(image==null||image2==null){
         alert('Фото не загружены')
        }
        else if(value2=='')
        {
            alert('Марка не заполнена')
        }
        else if(value3=='')
        {
            alert('Модель не заполнена')
        }
        else if(value4=='')
        {
            alert('Год производства не заполнен')
        }
        else if(value5=='')
        {
            alert('Регистрационный номер')
        }
        else if(value6=='')
        {
            alert('Дата регистрации не заполнена')
        }

        else{

            let arrTr = [...entriesTransport];

            arrTr[checkIdTransport].marka = value2;
            arrTr[checkIdTransport].model = value3;
            arrTr[checkIdTransport].year_of_born = value4;
            arrTr[checkIdTransport].number_registrion = value5;
            arrTr[checkIdTransport].status=valueS;
            arrTr[checkIdTransport].data_registrion = value6;
            arrTr[checkIdTransport].data_delete = value7;
            arrTr[checkIdTransport].img = value8;
            arrTr[checkIdTransport].img2 = value9;
            setEntriesTransport(arrTr)
            activateCardTransportAdd(false)
            setImage(null);
            setImage2(null);
        }
    }

    function onClickSave2() {
        console.log(checkIdTransport);
        let value2 = document.getElementById('marka_transport_save2'+[checkIdTransport-1]).value;
        let value3 = document.getElementById('model_transport_save2'+[checkIdTransport-1]).value;
        let value4 = document.getElementById('year_of_born_save2'+[checkIdTransport-1]).value;
        let value5 = document.getElementById('number_transport_save2'+[checkIdTransport-1]).value;
        let value6 = document.getElementById('data_reg_transport_save2'+[checkIdTransport-1]).value;
        let value7 = document.getElementById('data_end_transport_save2'+[checkIdTransport-1]).value;
        let valueS = document.getElementById('status_save'+[checkIdTransport-1]).value;
        let value8=image;
        let value9=image2;
        if(image==null||image2==null){
            alert('Фото не загружены')
        }
        else if(value2=='')
        {
            alert('Марка не заполнена')
        }
        else if(value3=='')
        {
            alert('Модель не заполнена')
        }
        else if(value4=='')
        {
            alert('Год производства не заполнен')
        }
        else if(value5=='')
        {
            alert('Регистрационный номер')
        }
        else if(value6=='')
        {
            alert('Дата регистрации не заполнена')
        }

        else{

            let arrTr = [...entriesTransport];
            arrTr[checkIdTransport-1].marka = value2;
            arrTr[checkIdTransport-1].model = value3;
            arrTr[checkIdTransport-1].year_of_born = value4;
            arrTr[checkIdTransport-1].number_registrion = value5;
            arrTr[checkIdTransport-1].status=valueS;
            arrTr[checkIdTransport-1].data_registrion = value6;
            arrTr[checkIdTransport-1].data_delete = value7;
            arrTr[checkIdTransport-1].img = value8;
            arrTr[checkIdTransport-1].img2 = value9;
            setEntriesTransport(arrTr)
            activateCardTransportAdd(false)
            setImage(null);
            setImage2(null);
        }
    }

    function addTransport() {
        let id=Object.keys(entriesTransport).length;
        console.log(id)
        const newArr={
            "id_transport1": id+1,
            "marka": '',
            "model":'',
            "year_of_born": '',
            "number_registrion":'' ,
            "status":'',
            "data_registrion": '' ,
            "data_delete":'',
            "img":'',
            "img2":''
        };
       let arr = [...entriesTransport]
       arr.push(newArr);
        setEntriesTransport(arr);
    }
    if(authorization==false){
        return(
      <>
        <h1>Вы не авторизированы</h1>
        </>
        )
    }
    else {
    const i = orders.length-1;

      function onloadDoc(){
            var filter, table, tr, td, j;

            filter = "Требует списания";
            table = document.getElementById("myTableTime");
            tr = table.getElementsByTagName("tr");

            for ( j = 0; j < tr.length; j++) {
                td = tr[j].getElementsByTagName("td")[6];
                console.log(td)
                if (td.innerHTML!==filter) {
                }
                else{
                    tr[j].classList.add(home.style_tr2);
                    window.getElementById("load1");
                }

            }
        }
        try {
        return (
            <div onMouseMoveCapture={onloadDoc}  className={home.container}>
                <Grid columns={12}>
                <Cell width={12} center>
                 <h1 className={home.h1_settings}>Приветствую, {users[0].Name} </h1>
                </Cell>
                    <Cell width={2}  className={home.text}>
                   <div className="w3-bar-block text">
                     <div className="w3-bar-item" style={{marginBottom:'25px'}}>
                     <div onClick={OnClickOrders} style={{display: "flex", flexRotation:"row"}} className={home.text_tables_setting}>
                        <img src="orders.png" className={home.img_size} />
                        <h3 className={home.h3_background_hover}>Управление заказами</h3>
                        </div>
                        </div>
                     <div onClick={OnClickTransport} className="w3-bar-item">
                     <div style={{display: "flex", flexRotation:"column"}}>
                     <img src="drone.png" className={home.img_size2} style={{marginLeft:'-10px'}}/>
                                            <h3 className={home.h3_background_hover}>Управление транспортом</h3>
                                             </div>
                     </div>
                   </div>
                 </Cell>

                 <Cell width={10} center style={{background:"#640064"}} height={19}>
                 <div style={{width:"100%",height:"80%",marginTop:"6%", marginLeft:"3%", background:"#a400a4"}}>

                {ContentMenu ?
                                 <Grid>
                                 <Cell width="6" top="2"  style={{display:"flex", flexRotatation:"column"}}>
                                 <div style={{display:"flex"}}>
                                   <img src="filter.png" style={{maxWidth: "3vh", marginRight:"10px", marginLeft:"10px"}} />
                                  <input type="datetime-local" id="date_input" style={{width: "15vw", marginRight:"30px"}} onChange={onChangeInputDate}/>
                                   <input type="text" id="text_input" placeholder="Состояние заказа" style={{width: "15vw"}} onChange={onChangeInputText}/>
                                   </div>
                                  </Cell>
                                  <Cell width="6" top="4" >

                <JsonDataDisplay/>
                                    </Cell>

<Cell width="5" left="7" top="4">
    {formadd ?
    <div>
    <h2 className={home.h2_style}>Карточка заказа</h2>
        <table id="myTable" cellSpacing="0" rules="all" border="1" style={{borderCollapse: "collapse", width:"40%", marginLeft:"5%"}} className={home.text_tables_setting}>
            <thead>
            <th>Номер заказа</th>
            <th>Дата/Время заказа</th>
            <th>Заказчик (пользователь)</th>
            <th>Адрес точки отправления</th>
            <th>Адрес точки назначения</th>
            <th>Состояние заказа</th>
            <th>Выделенный транспорт</th>
            <th>Оператор (пользователь)</th>
            </thead>
            <tbody>
                <tr>
                    <td>{entries[checkId-1].id_order}</td>
                    <td>{entries[checkId-1].date_time_order}</td>
                    <td>{entries[checkId-1].id_user}</td>
                    <td>{entries[checkId-1].adress_A}</td>
                    <td>{entries[checkId-1].adress_B}</td>
                    <td>{entries[checkId-1].status}</td>
                    <td>{entries[checkId-1].id_transport}</td>
                    <td>{entries[checkId-1].id_operator}</td>
                </tr>
            </tbody>
        </table>
        <div style={{display:"flex",flexDirection:"row",marginLeft:"5%"}}>
        <Button style={{marginTop:"5%", marginRight:"3%"}} onClick={onClickChangeStatusCancel}>Отменить</Button>
        <Button style={{marginTop:"5%"}} onClick={onClickChangeStatusClose}>Закрыть</Button>
        </div>
    </div>
    :null}
    {ActiveTransport ?
        <div>
            <h2 className={home.h2_style}>Карточка заказа</h2>
            <table id="myTable" cellSpacing="0" rules="all" border="1" style={{borderCollapse: "collapse", width:"40%", marginLeft:"5%"}} className={home.text_tables_setting}>
                <thead>


                <th>Номер заказа</th>
                <th>Дата/Время заказа</th>
                <th>Заказчик (пользователь)</th>
                <th>Адрес точки отправления</th>
                <th>Адрес точки назначения</th>
                <th>Состояние заказа</th>
                <th>Выделенный транспорт</th>
                <th>Оператор (пользователь)</th>
                </thead>
                <tbody>
                <tr>
                    <td>{entries[checkId-1].id_order}</td>
                    <td>{entries[checkId-1].date_time_order}</td>
                    <td>{entries[checkId-1].id_user}</td>
                    <td>{entries[checkId-1].adress_A}</td>
                    <td>{entries[checkId-1].adress_B}</td>
                    <td>{entries[checkId-1].status}</td>
                    <td>{entries[checkId-1].id_transport}</td>
                    <td>{entries[checkId-1].id_operator}</td>
                </tr>
                </tbody>
            </table>
            <div style={{marginTop:'15px',display: "flex", flexDirection:"row",marginLeft:"5%"}}>
            <input type="number" id={"et"+[checkId-1]} style={{height:"10%",marginRight:"2%"}}/>
                <div style={{display: "flex", flexDirection:"column"}}>
                <Button  onClick={onClickChange}>Добавить транспорт</Button>
                <Button style={{marginTop:"5%"}} onClick={onClickChangeStatus}>Изменить статус</Button>
                </div>
            </div>
        </div>
        :null}
</Cell>
                                  </Grid>
                                  :null}

                 {ContentMenu2 ?
                 <Grid>
                     <Cell width="6" top="2"  style={{display:"flex", flexRotatation:"column"}}>
                         <div style={{display:"flex"}}>
                             <img src="filter.png" style={{maxWidth: "3vh", marginRight:"10px", marginLeft:"10px"}} />
                             <input type="text" id="reg_input" placeholder="Регистрационный номер" style={{width: "10vw", marginRight:"20px"}} onChange={onChangeInputReg}/>
                             <input type="text" id="marka_input" placeholder="Марка" style={{width: "10vw", marginRight:"20px"}} onChange={onChangeInputMark}/>
                             <input type="text" id="model_input" placeholder="Модель" style={{width: "10vw", marginRight:"20px"}} onChange={onChangeInputModel}/>
                         </div>
                     </Cell>
                  <Cell width="2" top="3" left={1}>

<JsonDataDisplayTime/>
                      <Button style={{marginTop:"12%"}} onClick={addTransport}>Добавить транспорт</Button>
                    </Cell>

                     {cardTransportAdd ?
                         <Cell top="4" width={1}>
                             <div style={{display:"flex", flexDirection:"column", marginLeft:"15%"}}>
                         <table id="myTableTime" cellSpacing="0" rules="all" border="1" style={{borderCollapse: "collapse", width:"10%"}} className={home.text_tables_setting}>
                             <thead>
                             <th>Марка</th>
                             <th>Модель</th>
                             <th>Год производства</th>
                             <th>Регистрационный номер</th>
                             <th>Статус</th>
                             <th>Дата регистрации</th>
                             <th>Дата списания</th>
                             <th>Фото</th>
                             </thead>
                             <tbody>
                                             <tr>
                                                 <td><input type="text" id={'marka_transport_save'+[checkIdTransport-1]}/></td>
                                                 <td><input type="number" id={"model_transport_save"+[checkIdTransport-1]}/></td>
                                                 <td><input type="text" id={'year_of_born_save'+[checkIdTransport-1]}/></td>
                                                 <td><input className={home.Numberinput} type="text" title="Пример ABV 992-123-983" pattern="[A-Z]{3}\s[0-9]{3}-[0-9]{3}-[0-9]{3}"  id={'number_transport_save'+[checkIdTransport-1]}/></td>
                                                 <td>{entriesTransport[checkIdTransport-1].status}</td>
                                                 <td><input type="text" id={'data_reg_transport_save'+[checkIdTransport-1]}/></td>
                                                 <td><input type="text" id={'data_end_transport_save'+[checkIdTransport-1]}/></td>
                                                 <td><input type="file" onChange={onImageChange} className="filetype" />
                                                 <img style={{width:"20%"}} src={image} alt="preview image" />
                                                     <input type="file" onChange={onImageChange2} className="filetype" />
                                                     <img style={{width:"20%"}} src={image2} alt="preview image" />
                                                 </td>
                                             </tr>
                             </tbody>
                         </table>
                             <Button style={{width:"110%", marginTop:"13%"}} onClick={onClickSave}>Сохранить</Button></div>
                         </Cell>

                         :null}


                         {cardTransport ?
                             <Cell top="5" width="7"> <>
                             <table id="myTableTime" cellSpacing="0" rules="all" border="1" style={{borderCollapse: "collapse", width:"140%", marginLeft:"5%"}} className={home.text_tables_setting}>
                                 <thead>
                                 <th>id транспорта</th>
                                 <th>Марка</th>
                                 <th>Модель</th>
                                 <th>Год производства</th>
                                 <th>Регистрационный номер</th>
                                 <th>Дата регистрации</th>
                                 <th>Дата списания</th>
                                 <th>Статус</th>
                                 <th>Фото</th>
                                 <th>Фото2</th>
                                 </thead>
                                 <tbody>
                                 <tr>
                                     <td>{entriesTransport[checkIdTransport-1].id_transport1}</td>
                                     <td><input type="text" id={'marka_transport_save2'+[checkIdTransport-1]} style={{width:"50%"}} /></td>
                                     <td><input type="text" id={"model_transport_save2"+[checkIdTransport-1]} style={{width:"50%"}} /></td>
                                     <td><input type="text" id={"year_of_born_save2"+[checkIdTransport-1]} style={{width:"50%"}} /></td>
                                     <td><input type="text" className={home.Numberinput}  title="Пример ABV 992-123-983" pattern="[A-Z]{3}\s[0-9]{3}-[0-9]{3}-[0-9]{3}" id={"number_transport_save2"+[checkIdTransport-1]} style={{width:"50%"}} /></td>
                                     <td><input type="text" id={"data_reg_transport_save2"+[checkIdTransport-1]} style={{width:"50%"}} /></td>
                                     <td><input type="text" id={"data_end_transport_save2"+[checkIdTransport-1]} style={{width:"50%"}} /></td>
                                     <td><input type="text" id={'status_save'+[checkIdTransport-1]} style={{width:"50%"}} /></td>
                                     <td style={{width:"10%"}}>{
                                         <>
                                         <input type="file" onChange={onImageChange} className="filetype" />
                                             <img style={{width:"20%"}} src={image} alt="preview image" />
                                        </>
                                     }</td>
                                     <td  style={{width:"10%"}}> {<><input type="file" onChange={onImageChange2} className="filetype" />
                                         <img style={{width:"20%"}} src={image2} alt="preview image" />
                                         </>
                                     }</td>
                                 </tr>
                                 </tbody>
                             </table>
                                </>
                                 <Button style={{width:"20%", marginTop:"1%"}} onClick={onClickSave2}>Сохранить</Button>

                             </Cell>

                             : null}
                  </Grid>
                     :null}
                 </div>
                 </Cell>
                </Grid>
            </div>
        )
}
catch (error) {
  console.error(error);
}
    }}
