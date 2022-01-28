import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionsCreators } from "../state";
import { realTimeDB } from "../components/services/firebase";
import { useEffect } from "react";

export const DispatchAllcourses = () => {
    const dispatch = useDispatch();
    const {getAllCourse} = bindActionCreators(actionsCreators,dispatch)
    
    useEffect(() => {
      getAllCourse(realTimeDB);
    }, [getAllCourse]);

    return
}
