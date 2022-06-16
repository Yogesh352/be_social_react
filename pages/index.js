import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Button } from "@mantine/core";

export default function Home() {
  return (
    <div>
      <Button className="bg-blue-500">Hello</Button>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}
