import unittest
import mongo_connect
import json

class TestMongoConnect(unittest.TestCase):

    def test_all_tasks(self):
            tester = mongo_connect.app.test_client(self)
            response = tester.get('/todo/api/v1/tasks', content_type='application/json')
            self.assertEqual(response.status_code, 200)
