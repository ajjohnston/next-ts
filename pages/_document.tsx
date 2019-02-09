import Document, { NextDocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  public static async getInitialProps(ctx: NextDocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // @ts-ignore
          enhancer: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      if (initialProps.styles) {
        return {
          ...initialProps,
          styles: [...initialProps.styles, ...sheet.getStyleElement()],
        }
      }

      return {
        ...initialProps,
        styles: sheet.getStyleElement(),
      }
    } finally {
      Object.seal(sheet)
    }
  }
}
