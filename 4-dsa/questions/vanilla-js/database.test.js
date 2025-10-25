import {describe, expect, test, beforeEach} from "vitest";
import {Database} from "./database";

describe('Database', () => {
  let db;
  const fixedTimestamp = 160000000;

  beforeEach(() => {
    db = new Database();
  });

  test('Test level 1 case 01 simple set and get 1', function () {
    // this.timeout(400);
    db.set(0, 'employee1', 'age', 20);
    db.set(1, 'employee1', 'age', 30);
    db.set(2, 'employee2', 'age', 21);
    expect(db.get(3, 'employee1', 'age')).to.deep.equal(30);
  });

  test('operations work as expected', () => {
    // set(0, "A", "B", 4)
    db.set(0, "A", "B", 4);
    expect(db.records.get("A").get("B")).toBe(4);

    // set(1, "A", "C", 6)
    db.set(1, "A", "C", 6);
    expect(db.records.get("A").get("C")).toBe(6);

    // compareAndSet(2, "A", "B", 4, 9)
    expect(db.compareAndSet(2, "A", "B", 4, 9)).toBe(true);
    expect(db.records.get("A").get("B")).toBe(9);

    // compareAndSet(3, "A", "C", 4, 9)
    expect(db.compareAndSet(3, "A", "C", 4, 9)).toBe(false);
    expect(db.records.get("A").get("C")).toBe(6);

    // compareAndDelete(4, "A", "C", 6)
    expect(db.compareAndDelete(4, "A", "C", 6)).toBe(true);
    expect(db.records.get("A").has("C")).toBe(false);

    // get(5, "A", "C")
    expect(db.get(5, "A", "C")).toBe(null);

    // get(6, "A", "B")
    expect(db.get(6, "A", "B")).toBe(9);
  });

  test('edge cases', () => {
    expect(db.get(0, "nonexistent", "field")).toBe(null);
    expect(db.compareAndSet(0, "nonexistent", "field", 1, 2)).toBe(false);
    expect(db.compareAndDelete(0, "nonexistent", "field", 1)).toBe(false);
  });

  test('scan operations work as expected', () => {
    // Initial setup
    db.set(0, "A", "BC", 4);
    db.set(10, "A", "BD", 5);
    db.set(20, "A", "C", 6);

    // Test scanByPrefix
    expect(db.scanByPrefix(30, "A", "B")).toEqual(["BC(4)", "BD(5)"]);
    
    // Test scan
    expect(db.scan(40, "A")).toEqual(["BC(4)", "BD(5)", "C(6)"]);
    
    // Test scanByPrefix with non-existent key
    expect(db.scanByPrefix(50, "B", "B")).toEqual([]);
  });

  test('scan edge cases', () => {
    expect(db.scan(0, "nonexistent")).toEqual([]);
    
    db.set(0, "A", "field1", 1);
    db.set(1, "A", "field2", 2);
    
    // Test empty prefix
    expect(db.scanByPrefix(2, "A", "")).toEqual(["field1(1)", "field2(2)"]);
    
    // Test prefix with no matches
    expect(db.scanByPrefix(3, "A", "x")).toEqual([]);
  });

  test('TTL operations work as expected', () => {
    // set(1, "A", "B", 4)
    db.set(1, "A", "B", 4);
    
    // setWithTTL(2, "X", "Y", 5, 15)
    db.setWithTTL(2, "X", "Y", 5, 15);
    expect(db.get(3, "X", "Y")).toBe(5);
    
    // setWithTTL(4, "A", "D", 3, 6)
    db.setWithTTL(4, "A", "D", 3, 6);
    
    // compareAndSetWithTTL(6, "A", "D", 3, 5, 10)
    expect(db.compareAndSetWithTTL(6, "A", "D", 3, 5, 10)).toBe(true);
    expect(db.get(7, "A", "D")).toBe(5);
    
    // scan(15, "A")
    expect(db.scan(15, "A")).toEqual(["B(4)", "D(5)"]);
    
    // scan(17, "A")
    expect(db.scan(17, "A")).toEqual(["B(4)"]);
  });

  test('TTL edge cases', () => {
    db.setWithTTL(1, "A", "field", 1, 5);
    expect(db.get(1, "A", "field")).toBe(1);
    expect(db.get(6, "A", "field")).toBe(null); // Expired
    
    // TTL update through compareAndSetWithTTL
    db.setWithTTL(1, "A", "field2", 1, 5);
    expect(db.compareAndSetWithTTL(2, "A", "field2", 1, 2, 10)).toBe(true);
    expect(db.get(7, "A", "field2")).toBe(2); // Still valid
    expect(db.get(13, "A", "field2")).toBe(null); // Now expired
  });

  test('Test level 3 case 01 simple set and get', function () {
    // this.timeout(400);
    db.setWithTTL (fixedTimestamp, 'foo', 'bar', 150, 50);
    expect(db.get(fixedTimestamp + 20, 'foo', 'bar')).to.deep.equal(150);
    expect(db.get(fixedTimestamp + 30, 'foo', 'bar')).to.deep.equal(150);
    expect(db.get(fixedTimestamp + 50, 'foo', 'bar')).to.be.null;
    expect(db.get(fixedTimestamp + 80, 'foo', 'bar')).to.be.null;
  });

  test('Test level 3 case 02 simple set get and scan', function () {
    // this.timeout(400);
    expect(!!db.scan (fixedTimestamp + 10, '').length).to.be.false;
    expect(db.get(fixedTimestamp + 12, 'key1', 'key2')).to.be.null;
    expect(!!db.scanByPrefix(fixedTimestamp + 13, 'key1', 'key3').length).to.be.false;
    db.setWithTTL (fixedTimestamp + 20, 'key1', 'key2', 70, 20);
    db.setWithTTL(fixedTimestamp + 21, 'a', 'b', 52, 39);
    expect(db.get(fixedTimestamp + 22, 'key1', 'key2')).to.deep.equal(70);
    let expected = ['key2(70)'];
    expect(db.scanByPrefix(fixedTimestamp + 30, 'key1', 'k')).to.deep.equal(expected);
    expect(db.scan (fixedTimestamp + 32, 'key1')).to.deep.equal(expected);
    expect(!!db.scanByPrefix (fixedTimestamp + 50, 'key1', 'k').length).to.be.false;
    expect(!!db.scanByPrefix(fixedTimestamp + 60, 'key1', 'k').length).to.be.false;
  });

  test('Test level 3 case 03 simple set get cas and scan', function () {
    // this.timeout(400);
    db.set(fixedTimestamp + 100, 'foo', 'bar', 1);
    db.setWithTTL(fixedTimestamp + 170, 'key', 'key', 2, 680);
    expect(db.get(fixedTimestamp + 400, 'foo', 'bar')).to.deep.equal(1);
    let expected = ['key(2)'];
    expect(db.scanByPrefix(fixedTimestamp + 700, 'key', 'k')).to.deep.equal(expected);
    expect(db.compareAndSet(fixedTimestamp + 880, 'foo', 'bar', 1, 6)).to.be.true;
    expect(db.compareAndSetWithTTL(fixedTimestamp + 900, 'key', 'key', 2, 7, 200)).to.be.false;
    expect(db.compareAndDelete(fixedTimestamp + 920, 'foo', 'bar', 6)).to.be.true;
    expect(!!db.scan(fixedTimestamp + 950, 'foo').length).to.be.false;
    db.setWithTTL(fixedTimestamp + 970, 'key', 'key', 2, 230);
    db.setWithTTL(fixedTimestamp + 980, 'foo', 'bar', 1, 600);
    expect(db.compareAndSetWithTTL(fixedTimestamp + 1000, 'foo', 'bar', 1, 4, 300)).to.be.true;
    expect(db.compareAndSet(fixedTimestamp + 1200, 'key', 'key', 2, 5)).to.be.false;
    expect(!!db.scan(fixedTimestamp + 1250, 'key').length).to.be.false;
    expect(!!db.scan(fixedTimestamp + 1300, 'foo').length).to.be.false;
  });

  test('Test level 3 case 10 mixed multiple operations 2', function () {
    // this.timeout(400);
    db.setWithTTL(fixedTimestamp, 'a', 'a', 200, 40);
    db.setWithTTL(fixedTimestamp + 10, 'a', 'd', 100, 60);
    let expected = ['a(200)', 'd(100)'];
    expect(db.scan(fixedTimestamp + 20, 'a')).to.deep.equal(expected);
    expect(db.compareAndSet(fixedTimestamp + 30, 'a', 'a', 100, 200)).to.be.false;
    expect(db.compareAndSetWithTTL(fixedTimestamp + 50, 'a', 'd', 100, 30, 20)).to.be.true;
    db.setWithTTL(fixedTimestamp + 60, 'a', 'd', 20, 2);
    expect(db.compareAndSetWithTTL(fixedTimestamp + 65, 'a', 'd', 20, 50, 5)).to.be.false;
    expect(!!db.scanByPrefix(fixedTimestamp + 68, 'a', 'a').length).to.be.false;
    expect(!!db.scan(fixedTimestamp + 70, 'a').length).to.be.false;
    expect(db.get(fixedTimestamp + 72, 'a', 'd')).to.be.null;
    db.set(fixedTimestamp + 100, 'd', 'd', 3);
    expected = ['d(3)'];
    expect(db.scan(fixedTimestamp + 170, 'd')).to.deep.equal(expected);
    expect(db.compareAndSetWithTTL(fixedTimestamp + 200, 'd', 'd', 3, 30, 10)).to.be.true;
    expect(!!db.scan(fixedTimestamp + 220, 'd').length).to.be.false;
    db.setWithTTL(fixedTimestamp + 300, 'd', 'd', 100, 30);
    expect(db.compareAndDelete(fixedTimestamp + 310, 'd', 'd', 100)).to.be.true;
    db.set(fixedTimestamp + 311, 'd', 'd', 500);
    expect(!!db.scan(fixedTimestamp + 400, 'a').length).to.be.false;
    expected = ['d(500)'];
    expect(db.scan(5 * fixedTimestamp, 'd')).to.deep.equal(expected);
  });
}); 
