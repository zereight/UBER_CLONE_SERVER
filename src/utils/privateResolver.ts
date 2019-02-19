/* context의 user가 있는지 체크하고 있으면 1번째 인수의 함수를 실행. */
const privateResolver = resolverFunction => //curry방식을 이용. 그냥 x => y => x+y 랑 (x)(y) => x+y랑 비슷하다고 생각하면됨.
async (parent, args, context, info) => {

    //2번째 인수인 비동기함수의 인수로 http헤더(X-JWT)로 넘어온 토큰이 있는지 검사.
    if(!context.req.user) {
        throw new Error("No JWT. I refuse to proceed")
    }

    //아래 resolverFunction이 GetMyProfile.resolver에서 인수로 넘겨진 함수이다.
    const resolved = await resolverFunction(parent, args, context, info);
    return resolved;

};

export default privateResolver;