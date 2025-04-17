"use client";

import { Suspense, use, useEffect, useState } from "react";

import { StockInfo } from "@/types";
import { getStocksAction } from "./actions/getStockAction";

function StockDisplay({ stockPromise }: { stockPromise: Promise<StockInfo> }) {
  const { name, ui } = use(stockPromise);
  return (
    <div>
      <div className="font-bold text-3xl">{name}</div>
      <div>{ui}</div>
    </div>
  );
}

export default function Dashboard() {
  const [stocks, setStocks] = useState<Promise<StockInfo>[]>([]);

  const callStockActions = async () =>
    getStocksAction().then((stocks) => setStocks(stocks));

  useEffect(() => {
    getStocksAction().then((stocks) => setStocks(stocks));
  }, []);

  return (
    <>
      <button onClick={callStockActions}>클릭</button>
      <div className="grid grid-cols-3 gap-4 mt-5">
        {stocks.map((stockPromise, index) => (
          <Suspense key={index} fallback={<div>loading ...</div>}>
            <StockDisplay stockPromise={stockPromise} />
          </Suspense>
        ))}
      </div>
    </>
  );
}
