import { API_BASE_URL } from "../app-config";

export function call(api, method, request){
    let options = {
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        url: API_BASE_URL + api,
        method: method,
    };
    if(request){
        options.body = JSON.stringify(request);
        console.log("요청내용: " + options.body);
    }
    return fetch(options.url, options) //실행 결과 Promise객체 반환
            .then( (response) => 
                    response.json()
                    .then( (json) => {
                        if(!response.ok){
                            //response.ok가 true이면 정상적인 응답,그렇지 않으면 에러 응답
                            return Promise.reject(json);
                        }
                        console.log(json);
                        return json;
                    })
            );
}

export function update(userDTO) {
    return call("/user/updateUser", "PUT", userDTO);
}

export function deleteUser(uIdx) {
    return call(`/user/${uIdx}/deleteUser`, "DELETE", null);
} 
  
export function join(userDTO) {//회원가입
    return call("/user/insertUser", "POST", userDTO);
  }