import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
    questionList: [],
    wordImage: null,
    wordVideo: null,
    isCorrect: null
};

/* 액션 타입 */
const GET_WORDS = 'game/GET_WORDS';
const GET_WORD_IMAGE = 'game/GET_WORD_IMAGE';
const GET_WORD_VIDEO = 'game/GET_WORD_VIDEO';
const CHECK_CORRECT = 'game/CHECK_CORRECT';
const RESET_CORRECT = 'game/RESET_CORRECT';
const UPDATE_CORRECT = 'game/UPDATE_CORRECT';

/* 액션 생성자 */
export const { game: { getWords, getWordImage, getWordVideo, checkCorrect, resetCorrect, updateCorrect } } = createActions({
    [GET_WORDS]: result => ({ questionList: result.data }),
    [GET_WORD_IMAGE]: result => ({ wordImage: result.data.guide }),
    [GET_WORD_VIDEO]: result => ({ wordVideo: result.data }),
    [CHECK_CORRECT]: result => ({ isCorrect: result.data.isCorrect }),
    [RESET_CORRECT]: () => ({ isCorrect: null }),
    [UPDATE_CORRECT]: (index, isCorrect) => ({ index, isCorrect }),
});

/* 리듀서 */
const lipGameReducer = handleActions({
    [GET_WORDS]: (state, { payload }) => ({ ...state, questionList: payload.questionList }),
    [GET_WORD_IMAGE]: (state, { payload }) => ({ ...state, wordImage: payload.wordImage }),
    [GET_WORD_VIDEO]: (state, { payload }) => ({ ...state, wordVideo: payload.wordVideo }),
    [CHECK_CORRECT]: (state, { payload }) => ({ ...state, isCorrect: payload.isCorrect }),
    [RESET_CORRECT]: (state) => ({ ...state, isCorrect: null }),
    [UPDATE_CORRECT]: (state, { payload }) => ({
        ...state,
        questionList: state.questionList.map((item, index) =>
            index === payload.index
                ? { ...item, isCorrect: payload.isCorrect }
                : item
        )
    })
}, initialState);

export default lipGameReducer;
