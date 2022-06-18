import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Button } from "@mantine/core";
import Navbar from "../src/components/Navbar/Navbar";
export default function Home() {
  return (
    <div>
      <Navbar />
    </div>
  );
}
