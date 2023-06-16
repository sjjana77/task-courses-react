import React, { Component } from 'react'
import Specificourse from './Specificourse';


let first = 0;
class Defaultcourse extends Component {
  state = {
    selectedcourse:'',
    coursedisplay: true
  }

  defaultprops={
    courses:[
        {id:0,name:'python',img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png'},
        {id:1,name:'JavaScript',img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKd53xllmBiqGlJfxKQwfp0ZvoyNE_rrSCEa3RiqZbYM0eK6d6ublyRBHig807rFAWsEI&usqp=CAU'},
        {id:2,name:'React JS',img:'https://www.patterns.dev/img/reactjs/react-logo@3x.svg'},
        {id:3,name:'Node JS',img:'https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_f0b606abb6d19089febc9faeeba5bc05/nodejs-development-services.png'}
    ]
};

  render() {
    
    const {coursedisplayorder} = this.props
    if(coursedisplayorder === false){
      this.setState({coursedisplay:true})
    }
    const charactersData = this.defaultprops.courses
    const rows =charactersData.map((character)=>{
      return (
      <div onClick={()=>{this.setState({selectedcourse:character.id});this.setState({coursedisplay:false})}} className='courselist col flex-item-right'><img src={character.img} /><br />{character.name}
      </div>
      )
  })
    return (
      this.state.coursedisplay===true ?  
      <div className="course container ">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous" />
        <h2 className='looks'>Edwiself Learning Platform</h2>
        <h2 className='looks'>Let's start learning...</h2>
         <div className='fullcourselist '>{rows}</div>
         
         
        
         
      </div>
      :
      <Specificourse cent={0} selectedcourse={this.state.selectedcourse} />
     
    )
  }
}

export default Defaultcourse