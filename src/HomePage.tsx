import { useState } from "react"
import { useConnect, useSendTransaction } from "wagmi"
// import { Contract } from "./contract";


export const HomePage = () => {
    const [v, setv] = useState('');


    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect()
    return (
        <div className="App">
            <span>teste</span>
            <div>
                {connectors.map((connector) => (
                    <button
                        disabled={!connector.ready}
                        key={connector.id}
                        onClick={() => connect({ connector })}
                    >
                        {connector.name}
                        {!connector.ready && ' (unsupported)'}
                        {isLoading &&
                            connector.id === pendingConnector?.id &&
                            ' (connecting)'}
                    </button>
                ))}

                {error && <div>{error.message}</div>}
                {/* 
                <input value={v} onChange={e => setv(e.target.value)} />

                <button>send</button> */}
                {/* <Contract /> */}
            </div>


        </div>
    )
}