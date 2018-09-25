import unittest
import app
import json

class TestMongoConnect(unittest.TestCase):

    def test_all_tasks(self):
            tester = app.app.test_client(self)
            response = tester.get('/todo/api/v1/tasks', content_type='application/json')
            self.assertEqual(response.status_code, 200)

    def test_add(self):
            tester = app.app.test_client(self)
            response = tester.post('/todo/api/v1/tasks', data=json.dumps(dict({'task_id':'1', 'task_title':'this is a test title', 'task_description' : 'this is a test description', 'task_done': 'False'})), content_type='application/json')
            self.assertEqual(response.status_code, 200)

    def test_one_tasks(self):
        tester = app.app.test_client(self)
        response = tester.get('/todo/api/v1/tasks/1', content_type='application/json')
        self.assertEqual(response.status_code, 200)

    
    def test_delete_task(self):
        tester = app.app.test_client(self)
        response = tester.delete('/todo/api/v1/tasks/1', content_type='application/json')
        self.assertEqual(response.status_code, 200)
