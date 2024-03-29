import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';

const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const EnterStudentPage = React.lazy(() => import('pages/EnterStudentPage'));
const EnterLecturerPage = React.lazy(() => import('pages/EnterLecturerPage'));
const EnterModulePage = React.lazy(() => import('pages/EnterModulePage'));
const EnterCoursePage = React.lazy(() => import('pages/EnterCoursePage'));
const ViewStudentsPage = React.lazy(() => import('pages/ViewStudentsPage'));
const ViewLecturersPage = React.lazy(() => import('pages/ViewLecturersPage'));
const ViewModulesPage = React.lazy(() => import('pages/ViewModulesPage'));
const ViewCoursesPage = React.lazy(() => import('pages/ViewCoursesPage'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />

            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={DashboardPage} />

                <Route exact path="/enter_student_page" component={EnterStudentPage} />
                <Route exact path="/view_students_page" component={ViewStudentsPage} />
                <Route exact path="/enter_lecturer_page" component={EnterLecturerPage} />
                <Route exact path="/enter_course_page" component={EnterCoursePage} />
                <Route exact path="/view_courses_page" component={ViewCoursesPage} />
                <Route exact path="/view_lecturers_page" component={ViewLecturersPage} />
                <Route exact path="/enter_module_page" component={EnterModulePage} />
                <Route exact path="/view_modules_page" component={ViewModulesPage} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
