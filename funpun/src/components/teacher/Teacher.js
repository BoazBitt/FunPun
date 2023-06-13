import React, { useState, useEffect } from 'react'
import classes from './Teacher.module.scss'
import Container from '../container/Container'
import { useDispatch, useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import createClassroom from '../../functions/createClassroom'
import getClasses from '../../functions/getClasses'
import { authActions } from '../../store/authSlicer'
// import { useNavigate } from 'react-router-dom'
import { AiFillCopy } from 'react-icons/ai';
import { FcPlus } from 'react-icons/fc'
import { BsTrash3 } from 'react-icons/bs'
import deleteClassroom from '../../functions/deleteClassroom'
import { FcCheckmark, FcCancel } from 'react-icons/fc'


const Teacher = () => {
  // const [currentClasses , setCurrentClasses] = useState(null)
  const classrooms = useSelector(state => state.auth.classrooms)
  const [activeIndex, setActiveIndex] = useState(null);
  const [showStudents, setShowStudents] = useState(null)
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true)
  const [loader2, setLoader2] = useState(false)
  const [visable, setVisable] = useState(false)
  const [data, setData] = useState({ classID: '', capacity: 0, classLevel: 0 })
  const user = useSelector(state => state.auth.user)
  const onchangeHnadler = (e, type) => {
    setData({ ...data, [type]: e.target.value })
  }
  const links = []
  const genertaeLink = (classID, classLevel) => {
    const link = `http://localhost:3000/Student?classroom=${classID}&classLevel=${classLevel}`
    return link
  }
  for (let i = 0; i < classrooms.length; i++) {
    links.push(genertaeLink(classrooms[i].classID, classrooms[i].classLevel))

  }

  useEffect(() => {

    getClasses(user.user).then((classrooms) => {
      console.log(data)
      dispatch(authActions.setClassrooms(classrooms))
    })
    setTimeout(() => {
      setLoader(prev => !prev)
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const createGroup = () => {
    if (!data.classID) {
      alert('Class name is required')
      return

    }
    if (!data.capacity) {
      alert('Capacity is required')
      return
    }
    setLoader2(prev => !prev)
    console.log(data)
    createClassroom({ ...data, teacher: user.user })
      .then((data) => {
        console.log(data)
        getClasses(user.user).then((data) => {
          dispatch(authActions.setClassrooms(data))
          setVisable(prev => !prev)
          setLoader2(prev => !prev)

        })


      }).catch((errs) => {
        console.error(errs)
      })
  }
  const handleCopyLink = (event, index) => {
    event.stopPropagation(); // prevent the click event from propagating to the parent div
    setActiveIndex(index)
    navigator.clipboard.writeText(links[index]);
    setActiveIndex(index);
  };
  const deleteClass = (myclass) => {
    deleteClassroom(myclass)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });


  }
  const showStudentsHandler = (index) => {
    if (showStudents === null) {
      setShowStudents(index)
    }
    else {
      if (showStudents === index) {
        setShowStudents(null)
      }
      else {
        setShowStudents(index)
      }
    }
  };
  return (
    <Container className={classes.contentHeader} color={"#29215A"}>
      <div className={classes.Teacher}>
        <div className={classes.head}>?מה תרצה לעשות</div>
        <div className={classes.here}>
          <ClipLoader size={30} color={"#9ACD32"} loading={loader} speedMultiplier={1} />
        </div>
        {!loader && <div>
          <div className={classes.btns}>
            <span onClick={() => { setVisable(prev => !prev) }}>Add Group</span>
          </div>
          <div style={classrooms.length > 5 ? { overflowY: "scroll", height: "330px" } : null}
            className={classes.classroomContianer}>
            {classrooms && <>

              {

                classrooms.map((myclass, index) => (
                  <>


                    <div
                      key={index}
                      className={`${classes.classroom} ${index === activeIndex ? classes.activeClassroom : ''}`}
                      onClick={() => { showStudentsHandler(index) }}
                      style={myclass.students.length === 0 ? { paddingLeft: "60px" } : null}>
                      {myclass.students.length > 0 && <div className={classes.classroom_icon}><FcPlus /></div>}
                      <div className={classes.classroom_id}>{myclass.classID}</div>
                      <div className={classes.classroom_capity}>{myclass.students.length}/{myclass.capacity}</div>
                      <div className={classes.classroom_level}>{myclass.classLevel}</div>
                      {index === activeIndex ? (
                        <div className={classes.classroom_link}>Copied</div>
                      ) : (
                        <div className={classes.classroom_link}>Link for Class</div>
                      )}
                      <AiFillCopy onClick={(event) => handleCopyLink(event, index)} />
                      <BsTrash3 onClick={() => { deleteClass(myclass) }} />
                    </div>

                    {index === showStudents && < >
                      {myclass.students.map((student) =>
                        <div className={classes.studentInfo}>
                          <div className={classes.student_name}>{student.fullName}</div>
                          <div className={classes.student_done}>{student.done ? <FcCheckmark size={20} /> : <FcCancel size={20} />}</div>

                        </div>
                      )}
                    </>}


                  </>

                ))
              }</>

            }

          </div>
        </div>}
        {visable && !loader &&
          <>
            <div className={classes.classInfo}>
              <input onChange={(e) => { onchangeHnadler(e, 'classID') }} style={{ color: 'black' }} placeholder="Class's Name" />
              <select onChange={(e) => { onchangeHnadler(e, 'capacity') }} style={{ color: 'black' }} defaultValue="Capacity">
                <option disabled>Capacity</option>
                {Array.from({ length: 30 }, (_, index) => (
                  <option style={{ color: 'black', fontSize: 'small' }} key={index + 1} value={index + 1}>{index + 1}</option>
                ))}
              </select>
              <select onChange={(e) => { onchangeHnadler(e, 'classLevel') }} style={{ color: 'black' }} defaultValue="Level">
                <option disabled>Level</option>
                {Array.from({ length: 30 }, (_, index) => (
                  <option style={{ color: 'black', fontSize: 'small' }} key={index + 1} value={index + 1}>{index + 1}</option>
                ))}
              </select>
            </div>
            <div className={classes.btns}>
              <span onClick={createGroup}>Create Group</span>

            </div>
            <div className={classes.classloader}>
              <ClipLoader size={30} color={"#9ACD32"} loading={loader2} speedMultiplier={1} />
            </div>

          </>}




      </div>
    </Container>
  )
}

export default Teacher