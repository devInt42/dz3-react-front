import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Test() {
    const [hello,setHello] = useState('')

    useEffect( () => {

        axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
        <>
         백엔드에서 가져온 데이터입니다 : {hello}
        </>
    );
}

export default Test;