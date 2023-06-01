
const ShowBook = ({subject}) => {

    return <div className='subject_card'>
                {//naslov
                }
                <div className='subject_title_container'> 
                    <p className='subject_title'> {subject.name} </p>
                </div>
                {/*info*/}
                <div className='subject_info'>
                    {//<div>id:&nbsp;{subject.id}</div>
                    }
                    <br/>
                    <div>School year:&nbsp;{subject.year}</div>
                    <div>Semester:&nbsp;{subject.semester}</div>
                    <div>Weekly Hours:&nbsp;{subject.weeklyHours}</div>
                    <br/>
                    <div> <a href=''>Prikaži...</a> </div>
  
                </div>
           </div>
  
  }
  export default ShowBook;