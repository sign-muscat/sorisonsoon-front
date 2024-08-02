// import {request} from "./api";
// import {statusToastAlert} from "../utils/ToastUtils";
// import {checkCorrect, getWordImage, getWords, getWordVideo} from "../modules/HandGameReducer";

// export const callGetWordsAPI = (difficulty, totalQuestion) => {
//     return async (dispatch, getState) => {
//         try {
//             const queryString = `difficulty=${difficulty}&totalQuestion=${totalQuestion}`;

//             // const result = await request(
//             //     'GET',
//             //     `/get-words?${queryString}`
//             // );

//             const result = {
//                 status: 200,
//                 data: [
//                     {
//                         riddleId: 1,        // 문제 식별 번호
//                         question: '바나나',  // 문제(단어) 이름
//                         totalStep: 2        // 문제의 step 개수
//                     },
//                     {
//                         riddleId: 4,
//                         question: '안녕하세요',
//                         totalStep: 3
//                     },
//                     {
//                         riddleId: 6,
//                         question: '금연',
//                         totalStep: 3
//                     },
//                     {
//                         riddleId: 5,
//                         question: '빵집',
//                         totalStep: 2
//                     },
//                     {
//                         riddleId: 9,
//                         question: '소방관',
//                         totalStep: 4
//                     },
//                 ]
//             }

//             console.log('callGetWordsAPI result : ', result.data);

//             if(result.status === 200) {
//                 dispatch(getWords(result));
//             }
//         } catch {
//             const title = '문제가 발생했어요.';
//             const desc = '다시 시도해주세요.';
//             statusToastAlert(title, desc, 'error');
//         }
//     }
// }

// export const callGetWordImageAPI = (riddleId, currentStep) => {
//     return async (dispatch, getState) => {
//         try {
//             const requestData = {
//                 riddleId: riddleId,
//                 step: currentStep
//             };

//             // const result = await request(
//             //     'POST',
//             //     `/gameStart`,
//             //     'Content-Type: application/x-www-form-urlencoded',
//             //     requestData
//             // );

//             const result = {
//                 status: 200,
//                 data: {
//                     guide: '/images/no_smoking_2.png'
//                 }
//             }

//             console.log('callGetWordImageAPI result : ', result);

//             if(result.status === 200) {
//                 dispatch(getWordImage(result));
//             }

//         } catch {
//             const title = '문제가 발생했어요.';
//             const desc = '다시 시도해주세요.';
//             statusToastAlert(title, desc, 'error');
//         }
//     }
// }

// export const callGetWordVideoAPI = (riddleId) => {
//     return async (dispatch, getState) => {
//         try {
//             const queryString = `wordDes=${riddleId}`;

//             // const result = await request(
//             //     'GET',
//             //     `/get-video-link?${queryString}`
//             // );

//             const result = {
//                 status: 200,
//                 data: {
//                     videoLink: 'http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20200821/732937/MOV000257072_700X466.mp4'
//                 }
//             }
//             console.log('callGetWordVideoAPI result : ', result);

//             if (result.status === 200) {
//                 dispatch(getWordVideo(result));
//             }
//         } catch {
//             const title = '문제가 발생했어요.';
//             const desc = '다시 시도해주세요.';
//             statusToastAlert(title, desc, 'error');
//         }
//     }
// }

// export const callCheckCorrect = (formData) => {
//     return async (dispatch, getState) => {
//         try {
//             // const result = await request(
//             //     'POST',
//             //     '/result',
//             //     {'Content-Type' : 'multipart/form-data'},
//             //     formData
//             // );

//             const value = Math.random() < 0.5;
//             const result = {
//                 status: 200,
//                 data: {
//                     isCorrect: value
//                 }
//             }

//             console.log('callCheckCorrect result : ', result);

//             if (result.status === 200) {
//                 dispatch(checkCorrect(result));
//             }
//         } catch {
//             const title = '문제가 발생했어요.';
//             const desc = '다시 시도해주세요.';
//             statusToastAlert(title, desc, 'error');
//         }
//     }
// }   
import { request, uploadImage } from "./api";
import { statusToastAlert } from "../utils/ToastUtils";
import { getWords, getWordImage, getWordVideo, checkCorrect } from "../modules/HandGameReducer";

export const callGetWordsAPI = (difficulty, totalQuestion) => {
    return async (dispatch) => {
        try {
            const queryString = `difficulty=${difficulty}&totalQuestion=${totalQuestion}`;
            const result = await request('GET', `/get-words?${queryString}`);
            
            console.log('callGetWordsAPI result : ', result);

            if(result.status === 200) {
                dispatch(getWords(result));
            }
        } catch (error) {
            const title = '문제가 발생했어요.';
            const desc = '다시 시도해주세요.';
            statusToastAlert(title, desc, 'error');
        }
    }
}

export const callGetWordImageAPI = (riddleId, currentStep) => {
    return async (dispatch) => {
        try {
            const requestData = { riddleId, step: currentStep };
            const result = await request('POST', `/gameStart`, 'Content-Type: application/x-www-form-urlencoded', requestData);

            console.log('callGetWordImageAPI result : ', result);

            if(result.status === 200) {
                dispatch(getWordImage(result));
            }
        } catch (error) {
            const title = '문제가 발생했어요.';
            const desc = '다시 시도해주세요.';
            statusToastAlert(title, desc, 'error');
        }
    }
}

export const callGetWordVideoAPI = (riddleId) => {
    return async (dispatch) => {
        try {
            const queryString = `wordDes=${riddleId}`;
            const result = await request('GET', `/get-video-link?${queryString}`);
            
            console.log('callGetWordVideoAPI result : ', result);

            if (result.status === 200) {
                dispatch(getWordVideo(result));
            }
        } catch (error) {
            const title = '문제가 발생했어요.';
            const desc = '다시 시도해주세요.';
            statusToastAlert(title, desc, 'error');
        }
    }
}

export const callCheckCorrect = (formData) => {
    return async (dispatch, getState) => {
        try {
            const result = await uploadImage(formData);

            console.log('callCheckCorrect result : ', result);

            if (result.label) {
                const currentWord = getState().handGame.currentWord;
                dispatch(checkCorrect({
                    status: 200,
                    data: {
                        isCorrect: result.label === currentWord.question,
                        predictedLabel: result.label,
                        accuracy: result.accuracy
                    }
                }));
            }
        } catch (error) {
            const title = '문제가 발생했어요.';
            const desc = '다시 시도해주세요.';
            statusToastAlert(title, desc, 'error');
        }
    }
}