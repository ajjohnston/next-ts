import Document, { NextDocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class StyledDocument extends Document {
  public static getInitialProps({ renderPage }: NextDocumentContext) {
    const sheet = new ServerStyleSheet()

    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )

    const styleTags = sheet.getStyleElement()

    return { ...page, styleTags }
  }
}
