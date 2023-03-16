import React from "react";
import { Button, Result } from "antd";
import Link from "next/link";

const Unauthorized = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link href="/">Go Back</Link>
      </Button>
    }
  />
);

export default Unauthorized;
