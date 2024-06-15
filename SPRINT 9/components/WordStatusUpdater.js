import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { wordsLearningActions } from "../store/wordsLearningSlice";
import { REFRESH_STATUSES_SPAN } from "../constants";

export const WordStatusUpdater = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        setInterval(() => dispatch(wordsLearningActions.updateStatuses()), REFRESH_STATUSES_SPAN);
    }, [dispatch]);

    return null;
}