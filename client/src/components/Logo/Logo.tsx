import useGameState from "@/store/game"
import { motion } from "framer-motion"
import Link from "next/link"
import { shallow } from "zustand/shallow"

export interface ILogoProps {
  width?: number
}

function Logo({ width = 100 }: ILogoProps) {
  //TODO call GameService to reset game
  const { setGameStarted } = useGameState(
    (state) => ({
      setGameStarted: state.setGameStarted,
    }),
    shallow,
  )
  return (
    <button onClick={() => setGameStarted(false)}>
      <motion.svg
        layoutId="logo"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        fill="none"
        viewBox="0 0 126 121"
      >
        <path
          fill="#fff"
          d="M16.04 8.2c1.456 0 2.632.152 3.528.456.912.288 1.576.792 1.992 1.512.432.704.648 1.688.648 2.952 0 .768-.104 1.448-.312 2.04a2.822 2.822 0 01-.984 1.392c-.464.352-1.096.576-1.896.672v.12c.288.048.584.16.888.336.32.176.616.44.888.792.272.336.472.792.6 1.368l1.44 5.16h-3.864l-1.272-5.04c-.144-.544-.36-.92-.648-1.128-.272-.208-.656-.312-1.152-.312h-2.76a175.45 175.45 0 01-3.216-.096l.072-2.664h5.976c.64 0 1.144-.064 1.512-.192.384-.144.648-.392.792-.744.16-.352.24-.84.24-1.464 0-.64-.08-1.128-.24-1.464-.144-.352-.408-.592-.792-.72-.368-.144-.872-.216-1.512-.216-1.504 0-2.776.008-3.816.024s-1.752.04-2.136.072l-.36-2.616a29.61 29.61 0 011.896-.168c.592-.032 1.24-.048 1.944-.048.704-.016 1.552-.024 2.544-.024zm-2.76.24V25H9.656V8.44h3.624zm18.445-.336c1.312 0 2.424.144 3.336.432.912.272 1.64.736 2.184 1.392.56.64.968 1.52 1.224 2.64.256 1.104.384 2.488.384 4.152 0 1.664-.128 3.056-.384 4.176-.256 1.104-.664 1.984-1.224 2.64-.544.64-1.272 1.104-2.184 1.392-.912.272-2.024.408-3.336.408-1.312 0-2.424-.136-3.336-.408-.912-.288-1.648-.752-2.208-1.392-.56-.656-.968-1.536-1.224-2.64-.256-1.12-.384-2.512-.384-4.176 0-1.664.128-3.048.384-4.152.256-1.12.664-2 1.224-2.64.56-.656 1.296-1.12 2.208-1.392.912-.288 2.024-.432 3.336-.432zm0 2.904c-.848 0-1.512.168-1.992.504-.464.336-.8.92-1.008 1.752-.192.816-.288 1.968-.288 3.456 0 1.472.096 2.624.288 3.456.208.832.544 1.416 1.008 1.752.48.336 1.144.504 1.992.504.832 0 1.48-.168 1.944-.504.48-.336.816-.92 1.008-1.752.208-.832.312-1.984.312-3.456 0-1.488-.104-2.64-.312-3.456-.192-.832-.528-1.416-1.008-1.752-.464-.336-1.112-.504-1.944-.504zm16.403-2.856c.784 0 1.448.024 1.992.072.56.032 1.072.088 1.536.168.464.08.944.192 1.44.336l-.288 2.688a59.328 59.328 0 00-1.464-.072 38.46 38.46 0 00-1.416-.024 57.116 57.116 0 00-1.8-.024c-.816 0-1.456.16-1.92.48-.448.32-.768.88-.96 1.68-.192.784-.288 1.872-.288 3.264 0 1.392.096 2.488.288 3.288.192.784.512 1.336.96 1.656.464.32 1.104.48 1.92.48 1.104 0 2.032-.016 2.784-.048a34.045 34.045 0 002.232-.168l.312 2.688c-.768.24-1.552.408-2.352.504-.8.112-1.792.168-2.976.168-1.712 0-3.088-.272-4.128-.816-1.024-.56-1.768-1.464-2.232-2.712-.448-1.248-.672-2.928-.672-5.04s.224-3.792.672-5.04c.464-1.248 1.208-2.144 2.232-2.688 1.04-.56 2.416-.84 4.128-.84zm20.782.288l-4.32 6.672a3.982 3.982 0 01-.576.744 4.561 4.561 0 01-.624.528v.072c.224.128.464.32.72.576.256.256.464.528.624.816L69.198 25h-4.104l-5.112-8.664L64.95 8.44h3.96zm-9.48 0v4.68c0 .544-.04 1.088-.12 1.632a8.884 8.884 0 01-.384 1.56c.128.496.24 1.008.336 1.536.112.512.168.992.168 1.44V25h-3.648V8.44h3.648zm1.872 6.672v2.544h-2.976v-2.544h2.976zM16.016 30.2c1.552 0 2.768.16 3.648.48.88.32 1.504.872 1.872 1.656.384.784.576 1.88.576 3.288s-.184 2.504-.552 3.288c-.352.784-.936 1.336-1.752 1.656-.816.304-1.92.456-3.312.456-.736 0-1.456-.032-2.16-.096a30.171 30.171 0 01-1.968-.24 26.083 26.083 0 01-1.56-.288c-.432-.112-.728-.216-.888-.312l.072-1.824h5.952c.64-.016 1.136-.096 1.488-.24.368-.144.624-.408.768-.792.16-.384.24-.92.24-1.608 0-.704-.08-1.248-.24-1.632a1.299 1.299 0 00-.768-.792c-.352-.16-.848-.24-1.488-.24-1.472 0-2.736.008-3.792.024-1.056.016-1.768.048-2.136.096l-.36-2.64a29.61 29.61 0 013.816-.216c.704-.016 1.552-.024 2.544-.024zm-2.688.24V47H9.656V30.44h3.672zm18.31 0c.304 0 .568.088.793.264.24.176.4.408.48.696l4.8 15.6h-3.744l-3.384-12.168-.192-.816c-.064-.288-.12-.56-.168-.816h-.648c-.049.256-.104.528-.168.816a7.525 7.525 0 01-.192.816L25.83 47h-3.768l4.824-15.6c.08-.288.232-.52.456-.696.24-.176.512-.264.816-.264h3.48zm2.544 9.432v2.76H25.59v-2.76h8.592zM45.758 30.2c1.552 0 2.768.16 3.648.48.88.32 1.504.872 1.872 1.656.384.784.576 1.88.576 3.288s-.184 2.504-.552 3.288c-.352.784-.936 1.336-1.752 1.656-.816.304-1.92.456-3.312.456-.736 0-1.456-.032-2.16-.096a30.171 30.171 0 01-1.968-.24 26.083 26.083 0 01-1.56-.288c-.432-.112-.728-.216-.888-.312l.072-1.824h5.952c.64-.016 1.136-.096 1.488-.24.368-.144.624-.408.768-.792.16-.384.24-.92.24-1.608 0-.704-.08-1.248-.24-1.632a1.299 1.299 0 00-.768-.792c-.352-.16-.848-.24-1.488-.24-1.472 0-2.736.008-3.792.024-1.056.016-1.768.048-2.136.096l-.36-2.64a29.61 29.61 0 013.816-.216c.704-.016 1.552-.024 2.544-.024zm-2.688.24V47h-3.672V30.44h3.672zm14.572-.072c.896 0 1.8.008 2.712.024.912 0 1.808.016 2.688.048.88.032 1.704.088 2.472.168l-.168 2.664h-6.36c-.4 0-.704.104-.912.312-.192.208-.288.512-.288.912v8.448c0 .4.096.704.288.912.208.208.512.312.912.312h6.36l.168 2.664c-.768.064-1.592.12-2.472.168a73.98 73.98 0 01-2.688.048c-.912.016-1.816.024-2.712.024-1.056 0-1.912-.304-2.568-.912-.64-.624-.96-1.432-.96-2.424V33.704c0-1.008.32-1.816.96-2.424.656-.608 1.512-.912 2.568-.912zm-3.096 6.72h9.912v2.592h-9.912v-2.592zM74.493 30.2c1.456 0 2.632.152 3.528.456.912.288 1.576.792 1.992 1.512.432.704.648 1.688.648 2.952 0 .768-.104 1.448-.312 2.04a2.822 2.822 0 01-.984 1.392c-.464.352-1.096.576-1.896.672v.12c.288.048.584.16.888.336.32.176.616.44.888.792.272.336.472.792.6 1.368l1.44 5.16h-3.864l-1.272-5.04c-.144-.544-.36-.92-.648-1.128-.272-.208-.656-.312-1.152-.312h-2.76a175.45 175.45 0 01-3.216-.096l.072-2.664h5.976c.64 0 1.144-.064 1.512-.192.384-.144.648-.392.792-.744.16-.352.24-.84.24-1.464 0-.64-.08-1.128-.24-1.464-.144-.352-.408-.592-.792-.72-.368-.144-.872-.216-1.512-.216-1.504 0-2.776.008-3.816.024s-1.752.04-2.136.072l-.36-2.616a29.61 29.61 0 011.896-.168c.592-.032 1.24-.048 1.944-.048.704-.016 1.552-.024 2.544-.024zm-2.76.24V47H68.11V30.44h3.624zM15.128 52.128c.816 0 1.704.048 2.664.144.96.08 1.896.256 2.808.528l-.24 2.424c-.704-.016-1.528-.032-2.472-.048s-1.872-.024-2.784-.024c-.448 0-.832.016-1.152.048-.304.016-.552.08-.744.192a.819.819 0 00-.408.456c-.08.208-.12.496-.12.864 0 .56.128.968.384 1.224.272.256.728.488 1.368.696l3.192 1.032c1.328.448 2.248 1.056 2.76 1.824.512.768.768 1.776.768 3.024 0 .944-.112 1.728-.336 2.352-.224.624-.576 1.112-1.056 1.464-.48.352-1.112.6-1.896.744-.784.16-1.744.24-2.88.24-.544 0-1.32-.04-2.328-.12-1.008-.064-2.16-.24-3.456-.528l.24-2.592c.944.016 1.76.04 2.448.072.704.016 1.304.032 1.8.048h1.296c.64 0 1.136-.04 1.488-.12.368-.08.624-.24.768-.48.144-.24.216-.584.216-1.032 0-.384-.056-.688-.168-.912a1.058 1.058 0 00-.504-.552c-.224-.144-.536-.272-.936-.384l-3.36-1.152c-1.264-.464-2.16-1.072-2.688-1.824s-.792-1.744-.792-2.976c0-.96.112-1.736.336-2.328.24-.608.6-1.08 1.08-1.416.496-.336 1.128-.568 1.896-.696.784-.128 1.72-.192 2.808-.192zm15.07.024c.785 0 1.448.024 1.992.072.56.032 1.073.088 1.537.168.464.08.944.192 1.44.336l-.288 2.688a59.328 59.328 0 00-1.465-.072 38.46 38.46 0 00-1.416-.024 57.116 57.116 0 00-1.8-.024c-.816 0-1.456.16-1.92.48-.447.32-.767.88-.96 1.68-.192.784-.288 1.872-.288 3.264 0 1.392.096 2.488.288 3.288.192.784.512 1.336.96 1.656.465.32 1.105.48 1.92.48 1.104 0 2.032-.016 2.785-.048a34.045 34.045 0 002.232-.168l.311 2.688c-.768.24-1.552.408-2.352.504-.8.112-1.791.168-2.976.168-1.712 0-3.088-.272-4.128-.816-1.023-.56-1.768-1.464-2.232-2.712-.448-1.248-.672-2.928-.672-5.04s.224-3.792.672-5.04c.464-1.248 1.209-2.144 2.232-2.688 1.04-.56 2.416-.84 4.128-.84zm11.302.288V69h-3.648V52.44H41.5zm8.808-.312c.816 0 1.704.048 2.664.144.96.08 1.896.256 2.808.528l-.24 2.424c-.704-.016-1.528-.032-2.472-.048s-1.872-.024-2.784-.024c-.448 0-.832.016-1.152.048-.304.016-.552.08-.744.192a.819.819 0 00-.408.456c-.08.208-.12.496-.12.864 0 .56.128.968.384 1.224.272.256.728.488 1.368.696l3.192 1.032c1.328.448 2.248 1.056 2.76 1.824.512.768.768 1.776.768 3.024 0 .944-.112 1.728-.336 2.352-.224.624-.576 1.112-1.056 1.464-.48.352-1.112.6-1.896.744-.784.16-1.744.24-2.88.24-.544 0-1.32-.04-2.328-.12-1.008-.064-2.16-.24-3.456-.528l.24-2.592c.944.016 1.76.04 2.448.072.704.016 1.304.032 1.8.048h1.296c.64 0 1.136-.04 1.488-.12.368-.08.624-.24.768-.48.144-.24.216-.584.216-1.032 0-.384-.056-.688-.168-.912a1.058 1.058 0 00-.504-.552c-.224-.144-.536-.272-.936-.384l-3.36-1.152c-1.264-.464-2.16-1.072-2.688-1.824s-.792-1.744-.792-2.976c0-.96.112-1.736.336-2.328.24-.608.6-1.08 1.08-1.416.496-.336 1.128-.568 1.896-.696.784-.128 1.72-.192 2.808-.192zm14.062 0c.816 0 1.704.048 2.664.144.96.08 1.896.256 2.808.528l-.24 2.424c-.704-.016-1.528-.032-2.472-.048s-1.872-.024-2.784-.024c-.448 0-.832.016-1.152.048-.304.016-.552.08-.744.192a.819.819 0 00-.408.456c-.08.208-.12.496-.12.864 0 .56.128.968.384 1.224.272.256.728.488 1.368.696l3.192 1.032c1.328.448 2.248 1.056 2.76 1.824.512.768.768 1.776.768 3.024 0 .944-.112 1.728-.336 2.352-.224.624-.576 1.112-1.056 1.464-.48.352-1.112.6-1.896.744-.784.16-1.744.24-2.88.24-.544 0-1.32-.04-2.328-.12-1.008-.064-2.16-.24-3.456-.528l.24-2.592c.944.016 1.76.04 2.448.072.704.016 1.304.032 1.8.048h1.296c.64 0 1.136-.04 1.488-.12.368-.08.624-.24.768-.48.144-.24.216-.584.216-1.032 0-.384-.056-.688-.168-.912a1.058 1.058 0 00-.504-.552c-.224-.144-.536-.272-.936-.384l-3.36-1.152c-1.264-.464-2.16-1.072-2.688-1.824s-.792-1.744-.792-2.976c0-.96.112-1.736.336-2.328.24-.608.6-1.08 1.08-1.416.496-.336 1.128-.568 1.896-.696.784-.128 1.72-.192 2.808-.192zm15.19-.024c1.313 0 2.425.144 3.337.432.912.272 1.64.736 2.184 1.392.56.64.968 1.52 1.224 2.64.256 1.104.384 2.488.384 4.152 0 1.664-.128 3.056-.384 4.176-.256 1.104-.664 1.984-1.224 2.64-.544.64-1.272 1.104-2.184 1.392-.912.272-2.024.408-3.336.408-1.312 0-2.424-.136-3.336-.408-.912-.288-1.648-.752-2.208-1.392-.56-.656-.968-1.536-1.224-2.64-.256-1.12-.384-2.512-.384-4.176 0-1.664.128-3.048.384-4.152.256-1.12.664-2 1.224-2.64.56-.656 1.296-1.12 2.208-1.392.912-.288 2.024-.432 3.336-.432zm0 2.904c-.847 0-1.511.168-1.991.504-.464.336-.8.92-1.008 1.752-.192.816-.288 1.968-.288 3.456 0 1.472.096 2.624.288 3.456.208.832.544 1.416 1.008 1.752.48.336 1.144.504 1.992.504.832 0 1.48-.168 1.944-.504.48-.336.816-.92 1.008-1.752.208-.832.312-1.984.312-3.456 0-1.488-.104-2.64-.312-3.456-.192-.832-.528-1.416-1.008-1.752-.464-.336-1.112-.504-1.944-.504zM95.869 52.2c1.456 0 2.632.152 3.528.456.912.288 1.576.792 1.992 1.512.432.704.648 1.688.648 2.952 0 .768-.104 1.448-.312 2.04a2.822 2.822 0 01-.984 1.392c-.464.352-1.096.576-1.896.672v.12c.288.048.584.16.888.336.32.176.616.44.888.792.272.336.472.792.6 1.368l1.44 5.16h-3.864l-1.272-5.04c-.144-.544-.36-.92-.648-1.128-.272-.208-.656-.312-1.152-.312h-2.76a175.45 175.45 0 01-3.216-.096l.072-2.664h5.976c.64 0 1.144-.064 1.512-.192.384-.144.648-.392.792-.744.16-.352.24-.84.24-1.464 0-.64-.08-1.128-.24-1.464-.144-.352-.408-.592-.792-.72-.368-.144-.872-.216-1.512-.216-1.504 0-2.776.008-3.816.024s-1.752.04-2.136.072l-.36-2.616a29.61 29.61 0 011.896-.168c.592-.032 1.24-.048 1.944-.048.704-.016 1.552-.024 2.544-.024zm-2.76.24V69h-3.624V52.44h3.624zm17.387-.312c.816 0 1.704.048 2.664.144.96.08 1.896.256 2.808.528l-.24 2.424c-.704-.016-1.528-.032-2.472-.048s-1.872-.024-2.784-.024c-.448 0-.832.016-1.152.048-.304.016-.552.08-.744.192a.819.819 0 00-.408.456c-.08.208-.12.496-.12.864 0 .56.128.968.384 1.224.272.256.728.488 1.368.696l3.192 1.032c1.328.448 2.248 1.056 2.76 1.824.512.768.768 1.776.768 3.024 0 .944-.112 1.728-.336 2.352-.224.624-.576 1.112-1.056 1.464-.48.352-1.112.6-1.896.744-.784.16-1.744.24-2.88.24-.544 0-1.32-.04-2.328-.12-1.008-.064-2.16-.24-3.456-.528l.24-2.592c.944.016 1.76.04 2.448.072.704.016 1.304.032 1.8.048h1.296c.64 0 1.136-.04 1.488-.12.368-.08.624-.24.768-.48.144-.24.216-.584.216-1.032 0-.384-.056-.688-.168-.912a1.058 1.058 0 00-.504-.552c-.224-.144-.536-.272-.936-.384l-3.36-1.152c-1.264-.464-2.16-1.072-2.688-1.824s-.792-1.744-.792-2.976c0-.96.112-1.736.336-2.328.24-.608.6-1.08 1.08-1.416.496-.336 1.128-.568 1.896-.696.784-.128 1.72-.192 2.808-.192zM13.28 74.44v12.384c0 .4.112.704.336.912.224.208.544.312.96.312h5.784l.168 2.76c-1.136.128-2.328.2-3.576.216-1.232.032-2.464.048-3.696.048-1.2 0-2.112-.32-2.736-.96-.608-.656-.912-1.488-.912-2.496V74.44h3.672zm12.915 0V91h-3.648V74.44h3.648zm10.608 2.712l4.032.024-7.992 11.112-4.056-.024 8.016-11.112zm4.224 11.112V91h-12.24v-2.736h12.24zm-.192-13.824v2.736H28.979V74.44h11.856zm10.678 0c.305 0 .569.088.793.264.24.176.4.408.48.696l4.8 15.6h-3.744l-3.384-12.168-.192-.816c-.064-.288-.12-.56-.169-.816h-.648c-.047.256-.103.528-.167.816a7.525 7.525 0 01-.192.816L45.705 91h-3.767l4.823-15.6c.08-.288.232-.52.456-.696.24-.176.513-.264.816-.264h3.48zm2.544 9.432v2.76h-8.592v-2.76h8.592zm11.6-9.672c1.456 0 2.632.152 3.528.456.912.288 1.576.792 1.992 1.512.432.704.648 1.688.648 2.952 0 .768-.104 1.448-.312 2.04a2.822 2.822 0 01-.984 1.392c-.464.352-1.096.576-1.896.672v.12c.288.048.584.16.888.336.32.176.616.44.888.792.272.336.472.792.6 1.368L72.45 91h-3.864l-1.272-5.04c-.144-.544-.36-.92-.648-1.128-.272-.208-.656-.312-1.152-.312h-2.76a175.45 175.45 0 01-3.216-.096l.072-2.664h5.976c.64 0 1.144-.064 1.512-.192.384-.144.648-.392.792-.744.16-.352.24-.84.24-1.464 0-.64-.08-1.128-.24-1.464-.144-.352-.408-.592-.792-.72-.368-.144-.872-.216-1.512-.216-1.504 0-2.776.008-3.816.024s-1.752.04-2.136.072l-.36-2.616a29.61 29.61 0 011.896-.168c.592-.032 1.24-.048 1.944-.048.704-.016 1.552-.024 2.544-.024zm-2.76.24V91h-3.624V74.44h3.624zm18.42-.24c1.311 0 2.415.144 3.311.432.912.272 1.64.728 2.184 1.368.56.64.968 1.512 1.224 2.616.256 1.088.384 2.456.384 4.104 0 1.648-.128 3.024-.384 4.128-.256 1.088-.664 1.952-1.224 2.592-.544.64-1.272 1.104-2.184 1.392-.896.272-2 .408-3.312.408-1.264 0-2.424-.024-3.48-.072A143.47 143.47 0 0174.812 91l1.536-2.712c.608.032 1.328.064 2.16.096.848.016 1.784.024 2.808.024.816 0 1.456-.16 1.92-.48.48-.336.816-.92 1.008-1.752.208-.832.312-1.984.312-3.456s-.104-2.624-.312-3.456c-.192-.832-.528-1.416-1.008-1.752-.464-.336-1.104-.504-1.92-.504-.976 0-1.848.008-2.616.024h-2.256l-1.632-2.592c.96-.064 1.96-.12 3-.168a77.685 77.685 0 013.504-.072zm-2.833.24V91h-3.672V74.44h3.672zM15.128 96.128c.816 0 1.704.048 2.664.144.96.08 1.896.256 2.808.528l-.24 2.424c-.704-.016-1.528-.032-2.472-.048s-1.872-.024-2.784-.024c-.448 0-.832.016-1.152.048-.304.016-.552.08-.744.192a.819.819 0 00-.408.456c-.08.208-.12.496-.12.864 0 .56.128.968.384 1.224.272.256.728.488 1.368.696l3.192 1.032c1.328.448 2.248 1.056 2.76 1.824.512.768.768 1.776.768 3.024 0 .944-.112 1.728-.336 2.352-.224.624-.576 1.112-1.056 1.464-.48.352-1.112.6-1.896.744-.784.16-1.744.24-2.88.24-.544 0-1.32-.04-2.328-.12-1.008-.064-2.16-.24-3.456-.528l.24-2.592c.944.016 1.76.04 2.448.072.704.016 1.304.032 1.8.048h1.296c.64 0 1.136-.04 1.488-.12.368-.08.624-.24.768-.48.144-.24.216-.584.216-1.032 0-.384-.056-.688-.168-.912a1.058 1.058 0 00-.504-.552c-.224-.144-.536-.272-.936-.384l-3.36-1.152c-1.264-.464-2.16-1.072-2.688-1.824s-.792-1.744-.792-2.976c0-.96.112-1.736.336-2.328.24-.608.6-1.08 1.08-1.416.496-.336 1.128-.568 1.896-.696.784-.128 1.72-.192 2.808-.192zm14.95.072c1.553 0 2.768.16 3.649.48.88.32 1.504.872 1.872 1.656.384.784.576 1.88.576 3.288s-.184 2.504-.552 3.288c-.352.784-.936 1.336-1.752 1.656-.817.304-1.92.456-3.313.456-.735 0-1.456-.032-2.16-.096a30.171 30.171 0 01-1.968-.24 26.083 26.083 0 01-1.56-.288c-.431-.112-.728-.216-.887-.312l.072-1.824H30.006c.64-.016 1.136-.096 1.488-.24.369-.144.624-.408.769-.792.16-.384.24-.92.24-1.608 0-.704-.08-1.248-.24-1.632a1.299 1.299 0 00-.768-.792c-.353-.16-.849-.24-1.489-.24-1.471 0-2.736.008-3.791.024-1.056.016-1.768.048-2.137.096l-.36-2.64a29.61 29.61 0 013.817-.216c.703-.016 1.552-.024 2.543-.024zm-2.688.24V113h-3.672V96.44h3.672zm17.764-.336c1.312 0 2.424.144 3.336.432.912.272 1.64.736 2.184 1.392.56.64.968 1.52 1.224 2.64.256 1.104.384 2.488.384 4.152 0 1.664-.128 3.056-.384 4.176-.256 1.104-.664 1.984-1.224 2.64-.544.64-1.272 1.104-2.184 1.392-.912.272-2.024.408-3.336.408-1.312 0-2.424-.136-3.336-.408-.912-.288-1.648-.752-2.208-1.392-.56-.656-.968-1.536-1.224-2.64-.256-1.12-.384-2.512-.384-4.176 0-1.664.128-3.048.384-4.152.256-1.12.664-2 1.224-2.64.56-.656 1.296-1.12 2.208-1.392.912-.288 2.024-.432 3.336-.432zm0 2.904c-.848 0-1.512.168-1.992.504-.464.336-.8.92-1.008 1.752-.192.816-.288 1.968-.288 3.456 0 1.472.096 2.624.288 3.456.208.832.544 1.416 1.008 1.752.48.336 1.144.504 1.992.504.832 0 1.48-.168 1.944-.504.48-.336.816-.92 1.008-1.752.208-.832.312-1.984.312-3.456 0-1.488-.104-2.64-.312-3.456-.192-.832-.528-1.416-1.008-1.752-.464-.336-1.112-.504-1.944-.504zm16.404-2.856c.784 0 1.448.024 1.992.072.56.032 1.072.088 1.536.168.464.08.944.192 1.44.336l-.288 2.688a59.328 59.328 0 00-1.464-.072 38.46 38.46 0 00-1.416-.024 57.116 57.116 0 00-1.8-.024c-.816 0-1.456.16-1.92.48-.448.32-.768.88-.96 1.68-.192.784-.288 1.872-.288 3.264 0 1.392.096 2.488.288 3.288.192.784.512 1.336.96 1.656.464.32 1.104.48 1.92.48 1.104 0 2.032-.016 2.784-.048a34.045 34.045 0 002.232-.168l.312 2.688c-.768.24-1.552.408-2.352.504-.8.112-1.792.168-2.976.168-1.712 0-3.088-.272-4.128-.816-1.024-.56-1.768-1.464-2.232-2.712-.448-1.248-.672-2.928-.672-5.04s.224-3.792.672-5.04c.464-1.248 1.208-2.144 2.232-2.688 1.04-.56 2.416-.84 4.128-.84zm20.781.288l-4.32 6.672a3.982 3.982 0 01-.576.744 4.561 4.561 0 01-.624.528v.072c.224.128.464.32.72.576.256.256.464.528.624.816L82.627 113h-4.104l-5.112-8.664 4.968-7.896h3.96zm-9.48 0v4.68c0 .544-.04 1.088-.12 1.632a8.884 8.884 0 01-.384 1.56c.128.496.24 1.008.336 1.536.112.512.168.992.168 1.44V113h-3.648V96.44h3.648zm1.872 6.672v2.544h-2.976v-2.544h2.976z"
        ></path>
        <path stroke="#fff" strokeWidth="4" d="M1 1H125V120H1z"></path>
      </motion.svg>
    </button>
  )
}

export default Logo
