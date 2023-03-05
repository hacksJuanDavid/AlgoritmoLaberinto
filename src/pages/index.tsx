import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

/*
  Laboratorio El laberinto 

  Autor: Juan David Jimenez 
  Codigo: 71101
  Tecnologias usadas: Javascript, Typescript, React, Next.js, HTML, CSS
  A partir de una matriz booleana M de n x n se puede representar un laberinto 
  de tal manera que desde una posicion (i,j) se puede mover hacia las 4 casillas
  adyacentes (i-1,j), (i+1,j), (i,j-1), (i,j+1) y si la posicion M[i][j] es true,
  significa que puede pasar por la posicion (i,j), de lo contrario significa que
  alli hay un obstaculo.
  
  Escriba un algoritmo que permita encontrar un camino para ir desde la casilla
  (i,j) hasta la (m,n). El algoritmo debe retornar una lista de posiciones
  (i,j) que representan el camino desde la posicion inicial hasta la posicion
  final. 
*/

export default function Home() {
  const [positionFind, setPositionFind] = useState<any>([]);
  const [matrizPrint, setMatrizPrint] = useState<any>([]);

  // Imprimir la matriz
  const imprimirMatriz = () => {
    // matriz
    const matriz: boolean[][] = [
      [false, false, true, false, false, false, false, false],
      [false, false, true, false, false, false, false, false],
      [false, false, true, true, true, false, false, false],
      [false, false, false, false, true, false, false, false],
      [true, true, true, true, true, false, false, false],
      [true, false, false, false, false, true, true, true],
      [true, true, true, true, false, true, false, false],
      [false, false, false, true, true, true, false, false],
    ];
    // call function searchCrossMatriz2
    searchCrossMatriz2(matriz, 0, 0);
  };

  // function searchCrossMatriz2
  const searchCrossMatriz2 = (
    matriz: boolean[][],
    fila: number,
    columna: number
  ) => {
    // get true positions cross positions and index in array of objects with position and cross positions
    const truePosicionesSearchCross: any = [];
    // Search for adjacent "true" positions
    matriz.forEach((fila, filaIndex) => {
      fila.forEach((value, columnaIndex) => {
        if (value) {
          const searchCross = [
            { fila: filaIndex - 1, columna: columnaIndex },
            { fila: filaIndex + 1, columna: columnaIndex },
            { fila: filaIndex, columna: columnaIndex - 1 },
            { fila: filaIndex, columna: columnaIndex + 1 },
          ];

          // Add current position to the list of positions to be searched
          let positionsToSearch = [{ fila: filaIndex, columna: columnaIndex }];

          // Keep searching for adjacent "true" positions until no more are found
          while (positionsToSearch.length > 0) {
            // Get the next position to search
            const currentPosition = positionsToSearch.shift()!;

            // Check if the position has already been found
            const positionFound = truePosicionesSearchCross.some(
              (posicion: any) =>
                posicion.fila === currentPosition.fila &&
                posicion.columna === currentPosition.columna
            );

            if (!positionFound) {
              // Add the position to the list of found positions
              truePosicionesSearchCross.push({
                fila: currentPosition.fila,
                columna: currentPosition.columna,
                searchCross,
                index: truePosicionesSearchCross.length,
              });

              // Add adjacent positions to the list of positions to search
              searchCross.forEach((posicion) => {
                const nextPosition = {
                  fila: currentPosition.fila + posicion.fila - filaIndex,
                  columna:
                    currentPosition.columna + posicion.columna - columnaIndex,
                };

                if (
                  nextPosition.fila >= 0 &&
                  nextPosition.fila < matriz.length &&
                  nextPosition.columna >= 0 &&
                  nextPosition.columna < matriz[0].length &&
                  matriz[nextPosition.fila][nextPosition.columna]
                ) {
                  positionsToSearch.push(nextPosition);
                }
              });
            }
          }
        }
      });
    });

    // plot matrix with true positions and true  = 1 and false = 0
    const matrizPlot = matriz.map((fila) => {
      return fila.map((value) => {
        if (value) {
          return 1;
        } else {
          return 0;
        }
      });
    });

    // order array of objects with position and cross positions
    let orderPosition = truePosicionesSearchCross;
    setPositionFind(orderPosition);
    setMatrizPrint(matrizPlot);
    console.log("matriz:", matriz);
    console.log("truePosiciones:", orderPosition);
    console.log("matrizPlot:", matrizPlot);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/index.tsx</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>
        {/* Title*/}
        <h1 className={styles.title}>Laberinto</h1>
        {/* Parrafo explicacion codigo*/}
        <p className={styles.description}>
          A partir de una matriz booleana M de n x n se puede representar un
          laberinto de tal manera que desde una posicion (i,j) se puede mover
          hacia las 4 casillas adyacentes (i-1,j), (i+1,j), (i,j-1), (i,j+1) y
          si la posicion M[i][j] es true, significa que puede pasar por la
          posicion (i,j), de lo contrario significa que alli hay un obstaculo.
        </p>
        <p className={styles.description}>
          Escriba un algoritmo que permita encontrar un camino para ir desde la
          casilla (i,j) hasta la (m,n). El algoritmo debe retornar una lista de
          posiciones (i,j) que representan el camino desde la posicion inicial
          hasta la posicion final.
        </p>

        {/*Print matriz is 1 a colour green */}
        <div className={styles.grid}>
          <h3>Matriz</h3>
          {matrizPrint.map((fila: any, index: any) => {
            return (
              <div key={index} className={`${styles.card0}`}>
                {fila.map((value: any, index: any) => {
                  if (value === 1) {
                    return (
                      <div key={index} className={`${styles.card1}`}>
                        <h3>{value}</h3>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className={`${styles.card0}`}>
                        <h3>{value}</h3>
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>

        {/* Imprimir la matriz de posiciones*/}
        <div className={styles.description}>
          <h3>Posiciones:</h3>
          {positionFind.map((fila: any, index: any) => {
            return (
              <div key={index} className={styles.card}>
                <h3>{fila.fila + "," + fila.columna}</h3>
              </div>
            );
          })}
        </div>
        {/* Imprimir la matriz*/}
        <button className={styles.button} onClick={imprimirMatriz}>
          Imprimir Resultados
        </button>
      </main>
    </>
  );
}
