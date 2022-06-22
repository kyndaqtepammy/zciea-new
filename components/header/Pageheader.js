import React from 'react';
import { PageHeader } from 'antd';
 function PagesHeader(props) {
     return (    <PageHeader
        className="site-page-header"
        title={props.title}
        subTitle={props.subTitle} /> );
 }
 
 export default PagesHeader;