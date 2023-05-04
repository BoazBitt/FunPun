import classes from './Container.module.scss';
const Container = props =>{

    return(
        <div style={{background:props.color}}>
            <div className={classes.content + ' ' + props.className}>
                {props.children}
            </div>
        </div>
    );
  
    
}

export default Container;