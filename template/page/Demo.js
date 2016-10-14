/**
 * Created by ssehacker on 2016/10/8.
 */
import Page from '../../components/page';
import './demo.less';
import Table from '../../components/table';

class Demo extends React.Component {

  static renderPage() {
    return (<div>demo page</div>);
  }

  render() {
    return (
      <Page className="neo-demo">
        {Demo.renderPage()}
      </Page>
    );
  }
}

export default Demo;
