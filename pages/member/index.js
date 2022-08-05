import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Descriptions } from 'antd';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import bgimg from '../../public/img/idcard.jpg';
import logo from '../../public/img/avatar.webp';
import Image from "next/image"
import { Button } from 'antd';

function Member() {
    const router = useRouter();
    const id = router.query.userid;
    const [member, setMember] = useState();
    const componentRef = useRef();


    useEffect(() => {
        fetch('https://api.zciea.trade/api/user', {
            method: 'POST',
            body: JSON.stringify({
                userid: id
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                setMember(data)

            }).catch(error => console.error('Error:', error));

    }, [])

    return (

        <div className="site-card-wrapper">
            {console.log(member?.results[0])}

            {/* <Descriptions title={member?.results[0]?.name}>
                <Descriptions.Item label="Name">{member?.results[0]?.name}</Descriptions.Item>
                <Descriptions.Item label="Telephone">{member?.results[0]?.contact}</Descriptions.Item>
                <Descriptions.Item label="Territory">{member?.results[0]?.territory}</Descriptions.Item>
                {/* <Descriptions.Item label="Subscription Date">{new Date(member?.results[0]?.subscription_date.split("T"[0]))} </Descriptions.Item> 
                <Descriptions.Item label="Trade">{member?.results[0]?.trade}</Descriptions.Item>
            </Descriptions> */}

            <div>
                <ReactToPrint
                    trigger={() => <Button type="success" size="large" style={{marginBottom: "2em", width: "-wekit-fill-available"}}>Print Id</Button>
                }
                    content={() => componentRef.current}
                    pageStyle="@page { size: 0.5in 0.2in }"
                />
                <div ref={componentRef} >
                    {/* <div style={{backgroundImage: `url(${bgimg.src})`, width: "3.375in", height: "2.125in", backgroundSize: "cover"}}>
                        <div className="id" style={{display: "grid", justifyContent: "center"}}>
                            lknsalsnflsndflnal\
                        </div>
                    </div> */}
                    <section className='FlexContainer' style={{ backgroundImage: `url(${bgimg.src})`, backgroundSize: "cover" }} >
                        <div id="id-img-div">
                            <Image
                                width={200}
                                height={200}
                                src={logo}
                                blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                alt="Picture"
                                placeholder="blur"
                            />
                        </div>
                        <div id="id-details-div">
                            <span><h1>Name: {member?.results[0]?.name.split(" ")[0]}</h1></span>
                            <span><h1>Surname: {member?.results[0]?.name.split(" ")[1]}</h1></span>
                            <span><h1>ID Number: {member?.results[0]?.id_number}</h1></span>
                            <span><h1>Territorry: {member?.results[0]?.territory}</h1></span>
                            <span><h1>Gender: {member?.results[0]?.gender}</h1></span>
                            <span style={{whiteSpace: "nowrap"}}><label>Validity:</label><input type="text" style={{border: "none", fontSize: "x-large"}} /></span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )

};
export default Member;