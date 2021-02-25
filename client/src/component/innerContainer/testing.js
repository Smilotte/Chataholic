import React from 'react';
import axios from 'axios';
import questTemplate from './TestQs';
/**
 * @author xz72
 * @version 22/1/2020
 */

class Testing extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            UserId: this.props.id,
            Q1: '',
            Q2: '',
            Q3: '',
            Q4: '',
            Q5: '',
            Q6: '',
            Q7: '',
            Q8: '',
            Q9: '',
            Q10: '',
            Q11: '',
            Q12: '',
            Q13: '',
            Q14: '',
            Q15: '',
            Q16: '',
            Q17: '',
            Q18: '',
            Q19: '',
            Q20: ''
        }
    }

    addTest() {
        let p1 = this.getEorI();
        let p2 = this.getSorN();
        let p3 = this.getTorF();
        let p4 = this.getJorP();
        var result = p1 + p2 + p3 + p4
        const arr = [this.state.UserId, result];
        console.log(arr);
        axios.post('/api/profile/addTest', {params: arr})
            .then((data) => {
                console.log("amend suceesful");
                alert("Your personality is: " + result + " Amend successfully!");
            })
            .catch(error => console.log(error));

        this.props.history.push('/app/profile');
    }


    getValue(e){
        const{name, value}= e.target;
        this.setState({[name]: value});
    }

    getEorI() {
        let p1 = 'E';
        let p2 = 'I';
        let a = 0;
        let b = 0;
        if (this.state.Q1 === 'A') {a++} else {b++}
        if (this.state.Q2 === 'A') {a++} else {b++}
        if (this.state.Q3 === 'A') {a++} else {b++}
        if (this.state.Q4 === 'A') {a++} else {b++}
        if (this.state.Q5 === 'A') {a++} else {b++}
        console.log(a+","+b);
        if (a > b) {return p1} else {return p2}
    }

    getSorN() {
        let p1 = 'S';
        let p2 = 'N';
        let a = 0;
        let b = 0;
        if (this.state.Q6 === 'A') {a++} else {b++}
        if (this.state.Q7 === 'A') {a++} else {b++}
        if (this.state.Q8 === 'A') {a++} else {b++}
        if (this.state.Q9 === 'A') {a++} else {b++}
        if (this.state.Q10 === 'A') {a++} else {b++}
        console.log(a+","+b);
        if (a > b) {return p1} else {return p2}
    }

    getTorF() {
        let p1 = 'T';
        let p2 = 'F';
        let a = 0;
        let b = 0;
        if (this.state.Q11 === 'A') {a++} else {b++}
        if (this.state.Q12 === 'A') {a++} else {b++}
        if (this.state.Q13 === 'A') {a++} else {b++}
        if (this.state.Q14 === 'A') {a++} else {b++}
        if (this.state.Q15 === 'A') {a++} else {b++}
        console.log(a+","+b);
        if (a > b) {return p1} else {return p2}
    }

    getJorP() {
        let p1 = 'J';
        let p2 = 'P';
        let a = 0;
        let b = 0;
        if (this.state.Q16 === 'A') {a++} else {b++}
        if (this.state.Q17 === 'A') {a++} else {b++}
        if (this.state.Q18 === 'A') {a++} else {b++}
        if (this.state.Q19 === 'A') {a++} else {b++}
        if (this.state.Q20 === 'A') {a++} else {b++}
        console.log(a+","+b);
        if (a > b) {return p1} else {return p2}
    }

    render() {
        return (
            <div className="app-testing">
                <div id="cover"/>
                <div id="return" onClick={()=>this.props.history.goBack()}/>
                {
                    localStorage.getItem("openMenu")==="true"?
                        (
                            <div id="dropdown" >
                                <button onClick={this.props.logf}>Logout</button>
                            </div>
                        )
                        : (null)
                }
                <div id="testTitle">
                    <h1>Personality Test</h1>
                </div>
                <div className="questionBar">
                    {
                        questTemplate.map((q,i) =>
                            <div className="quiz" key ={i}>{i+". " + q.ques}<br/>
                                <input type="radio" name={q.name} value={q.A.value} onChange={(e) => this.getValue(e)}/>{q.A.content} <br/>
                                <input type="radio" name={q.name} value={q.B.value} onChange={(e) => this.getValue(e)}/>{q.B.content}
                            </div>
                        )
                    }
                    {/* <div id="testB">
                        <button id="testButton" onClick={() => this.addTest()}>Submit</button>
                    </div> */}
                    <button id="testButton" onClick={() => this.addTest()}>Submit</button>

                </div>
            </div>
        )

    }




}
export default Testing;
