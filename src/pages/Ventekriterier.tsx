import { useEffect, useState } from "react"

type Ventekriterie = {
  kodeFaggruppe: string
  typeBilag: string
  datoFom: string
  belopBrutto: number | null
  belopNetto: number | null
  antDagerEldreenn: number | null
  tidligereAar: boolean
}

export default function Ventekriterier() {
  const [data, setData] = useState<Ventekriterie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/fastedata-api/api/v1/ventekriterier")
      .then((res) => res.json())
      .then((json) => {
        setData(json)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching data", err)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Laster ventekriterier...</p>

  return (
    <div>
      <h1>Ventekriterier</h1>
      <ul>
        {data.map((item, i) => (
          <li key={i}>
            <strong>{item.kodeFaggruppe}</strong> – {item.typeBilag} – {item.datoFom}
            {item.belopBrutto && <> – Brutto: {item.belopBrutto}</>}
            {item.belopNetto && <> – Netto: {item.belopNetto}</>}
            {item.antDagerEldreenn && <> – Dager eldre enn: {item.antDagerEldreenn}</>}
            – Tidligere år: {item.tidligereAar ? "Ja" : "Nei"}
          </li>
        ))}
      </ul>
    </div>
  )
}
