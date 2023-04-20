import { Observable } from "rxjs/internal/Observable";
import { fromEvent, interval, skipUntil } from "rxjs";
import { Subject } from "rxjs/internal/Subject";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { ReplaySubject } from "rxjs/internal/ReplaySubject";
import { AsyncSubject } from "rxjs/internal/AsyncSubject";
import { from } from "rxjs/internal/observable/from";
import { merge } from "rxjs/internal/observable/merge";

// observableDemo();
// hotObservableDemo();
// subjectDemo();
// behaviourSubjectDemo();
// replaySubjectDemo();
// replaySubjectAdvancedDemo();
// asyncSubjectDemo();
// mergeObservablesDemo();
skipUntilDemo();

function observableDemo() {
  var observable = Observable.create((observer: any) => {
    try {
      observer.next("Hey guys!");
      observer.next("How are you?");
      setInterval(() => {
        observer.next("I am good");
      }, 2000);
    } catch {
      observer.error("Error");
    }
  });

  var observer = observable.subscribe(
    (x: any) => addItem(x),
    (error: any) => addItem(error),
    () => addItem("Completed")
  );

  var observer2 = observable.subscribe((x: any) => addItem(x));

  // Try to comment this line
  observer.add(observer2);

  setTimeout(() => {
    observer.unsubscribe();
  }, 6100);

  // Try to ucomment this line
  // setTimeout(() => { observer.complete('Completed') }, 3000)
}

function hotObservableDemo() {
  // hot observable
  let observable = fromEvent(document, "mousemove");

  setTimeout(() => {
    let subscription = observable.subscribe(addItem);
  }, 2000);
}

function subjectDemo() {
  let subject = new Subject();
  subject.subscribe(
    (data) => addItem("Observer 1: " + data),
    (err) => addItem(err),
    () => addItem("Observer 1 completed")
  );

  subject.next("The first thing has been sent");

  var observer2 = subject.subscribe((data) => addItem("Observer 2: " + data));

  subject.next("The second thing has been sent");
  subject.next("The third thing has been sent");

  observer2.unsubscribe();

  subject.next("A final thing has been sent");
}

function behaviourSubjectDemo() {
  let subject = new BehaviorSubject("First");
  subject.subscribe(
    (data) => addItem("Observer 1: " + data),
    (err) => addItem(err),
    () => addItem("Observer 1 completed")
  );

  subject.next("The first thing has been sent");
  subject.next("...Observer 2 is about to subscribe...");

  var observer2 = subject.subscribe((data) => addItem("Observer 2: " + data));

  subject.next("The second thing has been sent");
  subject.next("The third thing has been sent");

  observer2.unsubscribe();

  subject.next("A final thing has been sent");
}

function replaySubjectDemo() {
  let subject = new ReplaySubject(2);
  subject.subscribe(
    (data) => addItem("Observer 1: " + data),
    (err) => addItem(err),
    () => addItem("Observer 1 completed")
  );

  subject.next("The first thing has been sent");
  subject.next("Another first thing has been sent");
  subject.next("...Observer 2 is about to subscribe...");

  var observer2 = subject.subscribe((data) => addItem("Observer 2: " + data));

  subject.next("The second thing has been sent");
  subject.next("The third thing has been sent");

  observer2.unsubscribe();

  subject.next("A final thing has been sent");
}

function replaySubjectAdvancedDemo() {
  let subject = new ReplaySubject(30, 200);
  subject.subscribe(
    (data) => addItem("Observer 1: " + data),
    (err) => addItem(err),
    () => addItem("Observer 1 completed")
  );

  let i = 0;
  let interval = setInterval(() => subject.next(i++), 100);

  setTimeout(() => {
    let observer2 = subject.subscribe((data) => addItem("Observer 2: " + data));
  }, 500);
}

function asyncSubjectDemo() {
  let subject = new AsyncSubject();
  subject.subscribe(
    (data) => addItem("Observer 1: " + data),
    () => addItem("Observer 1 Completed")
  );

  let i = 1;
  let internal = setInterval(() => subject.next(i++), 100);

  setTimeout(() => {
    let observer2 = subject.subscribe((data) => addItem("Observer 2: " + data));
    subject.complete();
  }, 500);
}

function mergeObservablesDemo() {
  let firstObservable = from("a");
  let secondObservable = from("b");
  let merged = merge(firstObservable, secondObservable);

  merged.subscribe(addItem);
}

function skipUntilDemo() {
  const intervalObservable = interval(1000);
  const click = fromEvent(document, "click");

  const emitAfterClick = intervalObservable.pipe(skipUntil(click));

  emitAfterClick.subscribe((value) => addItem(value));
}

function addItem(val: any) {
  var node = document.createElement("li");
  var textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById("output").appendChild(node);
}
